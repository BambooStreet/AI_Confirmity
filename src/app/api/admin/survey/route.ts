import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAdminAuth } from "@/lib/admin-auth";
import {
  defaultQuestions,
  isSurveyType,
  surveyConfigKey,
  validateQuestions,
  type SurveyConfigKey,
} from "@/lib/survey";
import { normalizeLang } from "@/i18n/ui";

// type(pre|post) + lang(ko|en) → SurveyConfig 키 ("pre" | "post" | "pre_en" | "post_en")
function configKeyFrom(request: NextRequest): SurveyConfigKey | null {
  const type = request.nextUrl.searchParams.get("type");
  if (!isSurveyType(type)) return null;
  const lang = normalizeLang(request.nextUrl.searchParams.get("lang"));
  return surveyConfigKey(type, lang);
}

// 현재 적용 중인 문항을 반환한다. customized=false면 코드 기본값이 그대로 쓰이는 중.
export async function GET(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const key = configKeyFrom(request);
  if (!key) {
    return NextResponse.json({ error: "invalid type" }, { status: 400 });
  }
  const row = await prisma.surveyConfig.findUnique({ where: { type: key } });
  return NextResponse.json({
    questions: row ? (row.questions as unknown) : defaultQuestions[key],
    customized: !!row,
    updatedAt: row?.updatedAt ?? null,
  });
}

// 편집된 문항을 검증 후 저장(upsert)한다.
export async function PUT(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const key = configKeyFrom(request);
  if (!key) {
    return NextResponse.json({ error: "invalid type" }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON 파싱 실패" }, { status: 400 });
  }

  const questions = (body as { questions?: unknown })?.questions;
  const result = validateQuestions(questions);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 422 });
  }

  // Prisma Json 컬럼에 저장. SurveyQuestion[]는 순수 JSON 직렬화 가능.
  const json = result.questions as unknown as object;
  const saved = await prisma.surveyConfig.upsert({
    where: { type: key },
    create: { type: key, questions: json },
    update: { questions: json },
  });

  return NextResponse.json({
    questions: saved.questions,
    customized: true,
    updatedAt: saved.updatedAt,
  });
}

// 편집 내용을 버리고 코드 기본값으로 되돌린다(행 삭제).
export async function DELETE(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const key = configKeyFrom(request);
  if (!key) {
    return NextResponse.json({ error: "invalid type" }, { status: 400 });
  }
  await prisma.surveyConfig.deleteMany({ where: { type: key } });
  return NextResponse.json({
    questions: defaultQuestions[key],
    customized: false,
    updatedAt: null,
  });
}
