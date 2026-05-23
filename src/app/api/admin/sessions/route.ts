import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const ADMIN_PASSWORD = "2026";

function checkAuth(request: NextRequest): boolean {
  const headerPw = request.headers.get("x-admin-password");
  const queryPw = new URL(request.url).searchParams.get("password");
  return (headerPw ?? queryPw) === ADMIN_PASSWORD;
}

export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
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
      startedAt: true,
      completedAt: true,
      consent: true,
      currentStep: true,
      _count: { select: { responses: true, comments: true } },
    },
  });
  return NextResponse.json({ participants });
}
