"use client";

import { useSyncExternalStore } from "react";
import { normalizeLang, type Lang } from "@/i18n/ui";

// useExperimentSession과 동일한 패턴 — 랜딩에서 localStorage("lang")에 1회 기록되고,
// 참가자 플로우 중에는 어디서도 다시 쓰지 않는다(처치 일관성). 이 훅은 읽기 전용.

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot(): string {
  if (typeof window === "undefined") return "ko";
  return localStorage.getItem("lang") ?? "ko";
}

function getServerSnapshot(): string {
  return "ko";
}

export function useLang(): Lang {
  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return normalizeLang(value);
}
