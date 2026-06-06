import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAdminAuth } from "@/lib/admin-auth";
import { isPhase } from "@/lib/phases";

export async function GET(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const participant = await prisma.participant.findUnique({
      where: { id },
      include: {
        responses: { orderBy: { createdAt: "asc" } },
        comments: { orderBy: { createdAt: "asc" } },
      },
    });
    if (!participant) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ participant });
  }

  const participants = await prisma.participant.findMany({
    orderBy: { startedAt: "desc" },
    select: {
      id: true,
      condition: true,
      phase: true,
      language: true,
      externalId: true,
      startedAt: true,
      completedAt: true,
      consent: true,
      currentStep: true,
      _count: { select: { responses: true, comments: true } },
    },
  });
  return NextResponse.json({ participants });
}

// 참가자 단계 수동 변경 — 확인차 들어갔던 세션을 test로 재분류하는 등 사후 정정용
export async function PATCH(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id, phase } = body;

  if (typeof id !== "string" || id === "") {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }
  if (!isPhase(phase)) {
    return NextResponse.json(
      { error: "phase는 test | pilot | main 중 하나여야 합니다." },
      { status: 400 }
    );
  }

  try {
    const participant = await prisma.participant.update({
      where: { id },
      data: { phase },
    });
    return NextResponse.json({ participant });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
