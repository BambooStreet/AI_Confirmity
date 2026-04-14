import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isValidCondition } from "@/lib/conditions";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { condition } = body;

  if (!condition || !isValidCondition(condition)) {
    return NextResponse.json(
      { error: "Invalid condition" },
      { status: 400 }
    );
  }

  const participant = await prisma.participant.create({
    data: { condition },
  });

  const response = NextResponse.json({ id: participant.id });

  response.cookies.set("participant_id", participant.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
  });

  response.cookies.set("experiment_condition", condition, {
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
  if (completed) data.completedAt = new Date();

  const participant = await prisma.participant.update({
    where: { id: participantId },
    data,
  });

  return NextResponse.json(participant);
}
