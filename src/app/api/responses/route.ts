import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { participantId, surveyType, answers } = body;

  if (!participantId || !surveyType || !answers) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const responses = Object.entries(answers as Record<string, string>).map(
    ([questionId, answer]) => ({
      participantId,
      surveyType,
      questionId,
      answer,
    })
  );

  await prisma.response.createMany({ data: responses });

  return NextResponse.json({ success: true, count: responses.length });
}
