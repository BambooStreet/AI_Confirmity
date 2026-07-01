"use client";

import { useState } from "react";
import { UI } from "@/i18n/ui";
import { useLang } from "@/lib/useLang";

type RedditCommentInputProps = {
  onSubmit: (content: string) => void;
  isSubmitting?: boolean;
  placeholder?: string;
  buttonLabel?: string;
  minWords?: number;
};

function countWords(text: string): number {
  const trimmed = text.trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

export default function RedditCommentInput({
  onSubmit,
  isSubmitting = false,
  placeholder,
  buttonLabel = "Comment",
  minWords = 1,
}: RedditCommentInputProps) {
  const lang = useLang();
  const resolvedPlaceholder = placeholder ?? UI[lang].comment.placeholder;
  const [content, setContent] = useState("");
  const [focused, setFocused] = useState(false);

  const wordCount = countWords(content);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (wordCount < minWords) return;
    onSubmit(content.trim());
    setContent("");
    setFocused(false);
  };

  const disabled = wordCount < minWords || isSubmitting;
  const met = wordCount >= minWords;
  const remaining = minWords - wordCount;
  // 요구 단어 수를 항상 노출해 피험자가 사전에 인지하도록 함 (최소치가 2단어 이상일 때만)
  const showCounter = minWords > 1;
  const counter =
    lang === "en"
      ? met
        ? `✓ ${minWords} words reached`
        : `Minimum ${minWords} words (${remaining} more)`
      : met
        ? `✓ 최소 ${minWords}단어 충족`
        : `최소 ${minWords}단어 필요 (${remaining}단어 더)`;

  return (
    <form
      onSubmit={handleSubmit}
      className={`border rounded-md transition-colors ${
        focused ? "border-blue-500" : "border-gray-300"
      } bg-white`}
    >
      <p className="text-[11px] text-gray-500 px-3 pt-2">
        Comment as{" "}
        <span className="text-blue-600 font-semibold">
          u/{UI[lang].comment.selfName}
        </span>
      </p>
      {showCounter && (
        <p
          className={`mx-3 mt-1.5 inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${
            met
              ? "bg-green-50 text-green-700"
              : "bg-amber-100 text-amber-800"
          }`}
        >
          {counter}
        </p>
      )}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={resolvedPlaceholder}
        rows={focused || content ? 5 : 3}
        className="w-full px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none resize-none rounded-md bg-transparent"
      />
      <div className="flex justify-end items-center gap-2 px-3 py-2 border-t border-gray-100 bg-gray-50">
        <button
          type="submit"
          disabled={disabled}
          className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? "Posting…" : buttonLabel}
        </button>
      </div>
    </form>
  );
}
