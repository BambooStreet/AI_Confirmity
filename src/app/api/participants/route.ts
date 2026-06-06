import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isValidCondition } from "@/lib/conditions";
import { getCurrentPhase } from "@/lib/phases-server";
import { normalizeLang } from "@/i18n/ui";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { condition } = body;

  if (!condition || !isValidCondition(condition)) {
    return NextResponse.json(
      { error: "Invalid condition" },
      { status: 400 }
    );
  }

  // 외부 패널 식별자 — 형식이 어긋나면 저장만 생략하고 참가는 막지 않는다.
  const externalId =
    typeof body.externalId === "string" && body.externalId.trim() !== ""
      ? body.externalId.trim().slice(0, 256)
      : null;
  // 쿼리스트링 유래라 값은 전부 문자열이어야 한다 — 문자열만 남기고 길이를 제한
  let externalMeta: Record<string, string> | null = null;
  if (
    body.externalMeta &&
    typeof body.externalMeta === "object" &&
    !Array.isArray(body.externalMeta)
  ) {
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(body.externalMeta as object)) {
      if (typeof v === "string") out[k.slice(0, 256)] = v.slice(0, 2000);
    }
    if (Object.keys(out).length > 0) externalMeta = out;
  }

  // 같은 외부 식별자의 재진입(새로고침·링크 재클릭)은 기존 레코드를 재사용해 중복 생성을 막는다.
  let participant =
    externalId !== null
      ? await prisma.participant.findUnique({ where: { externalId } })
      : null;

  if (!participant) {
    // 연구자 확인용 진입: URL phase=test 만 허용 — 전역 설정을 무시하고 test로 기록.
    // (URL로 pilot/main을 지정하는 건 불가 — 배포 링크 실수로 인한 데이터 오염 방지)
    const phase = body.phase === "test" ? "test" : await getCurrentPhase();
    try {
      participant = await prisma.participant.create({
        data: {
          condition,
          phase,
          language: normalizeLang(body.lang),
          ...(externalId !== null ? { externalId } : {}),
          ...(externalMeta !== null ? { externalMeta } : {}),
        },
      });
    } catch (e: unknown) {
      // 동시 요청이 unique 제약(P2002)에 걸린 경우 — 먼저 생성된 레코드를 사용
      const isUniqueViolation =
        typeof e === "object" && e !== null && (e as { code?: string }).code === "P2002";
      if (isUniqueViolation && externalId !== null) {
        participant = await prisma.participant.findUnique({
          where: { externalId },
        });
      }
      if (!participant) throw e;
    }
  }

  const response = NextResponse.json({
    id: participant.id,
    condition: participant.condition,
    // 재진입(dedup) 시 기존 참가자의 언어가 우선되도록 응답에 포함
    language: participant.language,
  });

  response.cookies.set("participant_id", participant.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
  });

  response.cookies.set("experiment_condition", participant.condition, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
  });

  return response;
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const { participantId, currentStep, consent, completed } = body;

  if (!participantId) {
    return NextResponse.json(
      { error: "participantId required" },
      { status: 400 }
    );
  }

  const data: Record<string, unknown> = {};
  if (currentStep !== undefined) data.currentStep = currentStep;
  if (consent !== undefined) data.consent = consent;
  if (completed) {
    // 최초 완료 시각을 보존한다 — debrief 재방문 등으로 다시 호출돼도 덮어쓰지 않음
    const existing = await prisma.participant.findUnique({
      where: { id: participantId },
      select: { completedAt: true },
    });
    if (!existing?.completedAt) data.completedAt = new Date();
  }

  const participant = await prisma.participant.update({
    where: { id: participantId },
    data,
  });

  return NextResponse.json(participant);
}
