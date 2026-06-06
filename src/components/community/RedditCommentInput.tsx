"use client";

import { useState } from "react";
import { UI } from "@/i18n/ui";
import { useLang } from "@/lib/useLang";

type RedditCommentInputProps = {
  onSubmit: (content: string) => void;
  isSubmitting?: boolean;
  placeholder?: string;
  buttonLabel?: string;
  minLength?: number;
};

export default function RedditCommentInput({
  onSubmit,
  isSubmitting = false,
  placeholder,
  buttonLabel = "Comment",
  minLength = 1,
}: RedditCommentInputProps) {
  const lang = useLang();
  const resolvedPlaceholder = placeholder ?? UI[lang].comment.placeholder;
  const [content, setContent] = useState("");
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = content.trim();
    if (trimmed.length < minLength) return;
    onSubmit(trimmed);
    setContent("");
    setFocused(false);
  };

  const disabled = content.trim().length < minLength || isSubmitting;

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
