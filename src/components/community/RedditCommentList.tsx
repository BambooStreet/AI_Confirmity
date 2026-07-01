"use client";

import { useState } from "react";
import RedditCommentItem from "./RedditCommentItem";
import RedditCommentInput from "./RedditCommentInput";
import type { PresetComment } from "@/data/comments";
import { UI } from "@/i18n/ui";
import { useLang } from "@/lib/useLang";

export type { PresetComment };

type UserComment = {
  id: string;
  author: string;
  content: string;
  timeAgo: string;
};

type RedditCommentListProps = {
  presetComments: PresetComment[];
  showAiLabel: boolean;
  participantId: string;
  inputPlaceholder?: string;
  inputButtonLabel?: string;
  inputMinWords?: number;
  showInput?: boolean;
  onUserCommentSubmitted?: (content: string) => void;
};

export default function RedditCommentList({
  presetComments,
  showAiLabel,
  participantId,
  inputPlaceholder,
  inputButtonLabel,
  inputMinWords,
  showInput = true,
  onUserCommentSubmitted,
}: RedditCommentListProps) {
  const lang = useLang();
  const [userComments, setUserComments] = useState<UserComment[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (content: string) => {
    setIsSubmitting(true);
    let newId = `local-${Date.now()}`;
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ participantId, content }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.id) newId = data.id;
      }
    } catch {
      // fall through to local-only
    } finally {
      setUserComments((prev) => [
        ...prev,
        {
          id: newId,
          author: UI[lang].comment.selfName,
          content,
          timeAgo: lang === "en" ? "just now" : "방금 전",
        },
      ]);
      setIsSubmitting(false);
      onUserCommentSubmitted?.(content);
    }
  };

  const totalComments = presetComments.length + userComments.length;

  return (
    <section className="mt-4 bg-white border border-gray-200 rounded-md p-4">
      {showAiLabel && (
        <div className="mb-4 flex gap-3 rounded-lg border-2 border-red-400 bg-red-50 px-4 py-3.5 shadow-sm ring-1 ring-red-200">
          <span aria-hidden className="text-base leading-none mt-0.5">
            ⚠️
          </span>
          <div>
            <p className="text-sm font-extrabold uppercase tracking-wide text-red-700">
              {UI[lang].comment.aiBannerTitle}
            </p>
            <p className="mt-1 text-xs font-medium leading-relaxed text-red-800">
              {UI[lang].comment.aiBannerBody}
            </p>
          </div>
        </div>
      )}
      <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
        <span className="text-sm font-bold text-gray-900">
          {totalComments} Comments
        </span>
        <span className="text-xs text-gray-400">Sort by: Best</span>
      </div>

      <div className="divide-y divide-gray-100">
        {presetComments.map((c) => (
          <RedditCommentItem
            key={c.id}
            author={c.author}
            content={c.content}
            timeAgo={c.timeAgo}
            score={c.likes}
            showAiLabel={showAiLabel && c.isAiGenerated}
          />
        ))}

        {userComments.map((c) => (
          <RedditCommentItem
            key={c.id}
            author={c.author}
            content={c.content}
            timeAgo={c.timeAgo}
            score={1}
            showAiLabel={false}
            isCurrentUser
          />
        ))}
      </div>

      {showInput && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <RedditCommentInput
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            placeholder={inputPlaceholder}
            buttonLabel={inputButtonLabel}
            minWords={inputMinWords}
          />
        </div>
      )}
    </section>
  );
}
