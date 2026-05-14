"use client";

import { useState } from "react";

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
  placeholder = "본인의 의견을 댓글로 남겨주세요…",
  buttonLabel = "Comment",
  minLength = 1,
}: RedditCommentInputProps) {
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
        Comment as <span className="text-blue-600 font-semibold">u/나</span>
      </p>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
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
