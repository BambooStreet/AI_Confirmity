import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { participantId, content } = body;

  if (!participantId || !content) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const comment = await prisma.comment.create({
    data: { participantId, content },
  });

  return NextResponse.json({ id: comment.id });
}
