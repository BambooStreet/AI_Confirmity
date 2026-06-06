import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAdminAuth } from "@/lib/admin-auth";
import { isPhase } from "@/lib/phases";

// surveyType 컬럼 정렬 우선순위 (그 외 타입은 뒤에 알파벳순으로 붙는다)
const SURVEY_ORDER = ["pre", "asch", "euthanasia", "post"];

function csvCell(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return "";
  const s = String(value);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function isoOrEmpty(d: Date | null): string {
  return d ? d.toISOString() : "";
}

// 전체 참가자 데이터를 분석용 wide CSV로 내보낸다(참가자 1명 = 1행).
export async function GET(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  // ?phase=test|pilot|main 으로 특정 단계만 내보내기 (없으면 전체)
  const phaseParam = new URL(request.url).searchParams.get("phase");
  const phase = isPhase(phaseParam) ? phaseParam : null;

  const participants = await prisma.participant.findMany({
    where: phase ? { phase } : undefined,
    orderBy: { startedAt: "asc" },
    include: {
      responses: { orderBy: { createdAt: "asc" } },
      comments: { orderBy: { createdAt: "asc" } },
    },
  });

  // 1) 응답 컬럼 수집 — surveyType별로 questionId를 첫 등장 순서대로 모은다.
  const colsByType = new Map<string, string[]>();
  const seen = new Set<string>();
  let maxComments = 0;
  for (const p of participants) {
    for (const r of p.responses) {
      const key = `${r.surveyType}__${r.questionId}`;
      if (!seen.has(key)) {
        seen.add(key);
        if (!colsByType.has(r.surveyType)) colsByType.set(r.surveyType, []);
        colsByType.get(r.surveyType)!.push(r.questionId);
      }
    }
    if (p.comments.length > maxComments) maxComments = p.comments.length;
  }

  const orderedTypes = [
    ...SURVEY_ORDER.filter((t) => colsByType.has(t)),
    ...[...colsByType.keys()].filter((t) => !SURVEY_ORDER.includes(t)).sort(),
  ];
  const responseKeys: string[] = [];
  for (const t of orderedTypes) {
    for (const qid of colsByType.get(t)!) responseKeys.push(`${t}__${qid}`);
  }

  // 2) 헤더
  const meta = [
    "participant_id",
    "phase",
    "external_id",
    "external_meta",
    "condition",
    "language",
    "consent",
    "current_step",
    "completed",
    "started_at",
    "completed_at",
    "n_responses",
    "n_comments",
  ];
  const commentCols = Array.from(
    { length: maxComments },
    (_, i) => `comment_${i + 1}`
  );
  const header = [...meta, ...responseKeys, ...commentCols];

  // 3) 각 참가자 행
  const lines: string[] = [header.map(csvCell).join(",")];
  for (const p of participants) {
    const answers = new Map<string, string>();
    for (const r of p.responses) answers.set(`${r.surveyType}__${r.questionId}`, r.answer); // 중복 시 마지막 값

    const row: (string | number)[] = [
      p.id,
      p.phase,
      p.externalId ?? "",
      p.externalMeta ? JSON.stringify(p.externalMeta) : "",
      p.condition,
      p.language,
      p.consent ? "Y" : "N",
      p.currentStep,
      p.completedAt ? "Y" : "N",
      isoOrEmpty(p.startedAt),
      isoOrEmpty(p.completedAt),
      p.responses.length,
      p.comments.length,
      ...responseKeys.map((k) => answers.get(k) ?? ""),
      ...Array.from({ length: maxComments }, (_, i) => p.comments[i]?.content ?? ""),
    ];
    lines.push(row.map(csvCell).join(","));
  }

  // Excel에서 한글이 깨지지 않도록 UTF-8 BOM 추가
  const csv = "﻿" + lines.join("\r\n");
  const now = new Date();
  const stamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(
    now.getDate()
  ).padStart(2, "0")}_${String(now.getHours()).padStart(2, "0")}${String(
    now.getMinutes()
  ).padStart(2, "0")}`;

  const filePrefix = phase ? `participants_${phase}` : "participants_all";
  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filePrefix}_${stamp}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
