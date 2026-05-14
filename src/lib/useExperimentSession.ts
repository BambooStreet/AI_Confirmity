"use client";

import { useSyncExternalStore } from "react";
import { parseCondition, type CommentCount } from "@/lib/conditions";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot(): string {
  if (typeof window === "undefined") return "||";
  const pid = localStorage.getItem("participantId") || "";
  const condition = localStorage.getItem("condition") || "";
  return `${pid}|${condition}`;
}

function getServerSnapshot(): string {
  return "||";
}

export type ExperimentSession = {
  participantId: string;
  commentCount: CommentCount;
  hasAiLabel: boolean;
  isReady: boolean;
};

export function useExperimentSession(): ExperimentSession {
  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
  const [participantId, condition] = snapshot.split("|");
  const parsed = parseCondition(condition);
  return {
    participantId,
    commentCount: parsed?.commentCount ?? 10,
    hasAiLabel: parsed?.hasAiLabel ?? false,
    isReady: participantId.length > 0,
  };
}
