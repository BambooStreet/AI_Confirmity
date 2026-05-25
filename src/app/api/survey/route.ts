import { NextRequest, NextResponse } from "next/server";
import { getSurveyQuestions, isSurveyType } from "@/lib/survey";

// 설문 페이지가 문항을 불러올 때 사용하는 공개 엔드포인트. 읽기 전용.
export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get("type");
  if (!isSurveyType(type)) {
    return NextResponse.json(
      { error: "type은 pre 또는 post 여야 합니다." },
      { status: 400 }
    );
  }
  const questions = await getSurveyQuestions(type);
  return NextResponse.json({ questions });
}
