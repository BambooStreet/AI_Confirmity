import { prisma } from "@/lib/prisma";
import { DEFAULT_PHASE, isPhase, type Phase } from "@/lib/phases";

const CURRENT_PHASE_KEY = "currentPhase";

/** 새 참가자에게 찍힐 현재 실험 단계. 설정 행이 없거나 값이 잘못됐으면 안전 기본값(test). */
export async function getCurrentPhase(): Promise<Phase> {
  const row = await prisma.appSetting.findUnique({
    where: { key: CURRENT_PHASE_KEY },
  });
  return row && isPhase(row.value) ? row.value : DEFAULT_PHASE;
}

export async function setCurrentPhase(phase: Phase): Promise<void> {
  await prisma.appSetting.upsert({
    where: { key: CURRENT_PHASE_KEY },
    create: { key: CURRENT_PHASE_KEY, value: phase },
    update: { value: phase },
  });
}
