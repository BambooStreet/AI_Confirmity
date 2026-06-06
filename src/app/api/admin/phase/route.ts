import { NextRequest, NextResponse } from "next/server";
import { checkAdminAuth } from "@/lib/admin-auth";
import { isPhase } from "@/lib/phases";
import { getCurrentPhase, setCurrentPhase } from "@/lib/phases-server";

export async function GET(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ phase: await getCurrentPhase() });
}

export async function PUT(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  if (!isPhase(body.phase)) {
    return NextResponse.json(
      { error: "phase는 test | pilot | main 중 하나여야 합니다." },
      { status: 400 }
    );
  }

  await setCurrentPhase(body.phase);
  return NextResponse.json({ phase: body.phase });
}
