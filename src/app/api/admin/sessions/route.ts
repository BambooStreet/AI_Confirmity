import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAdminAuth } from "@/lib/admin-auth";

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
      startedAt: true,
      completedAt: true,
      consent: true,
      currentStep: true,
      _count: { select: { responses: true, comments: true } },
    },
  });
  return NextResponse.json({ participants });
}
