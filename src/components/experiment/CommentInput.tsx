"use client";

import { useState } from "react";

type CommentInputProps = {
  onSubmit: (content: string) => void;
  isSubmitting?: boolean;
};

export default function CommentInput({
  onSubmit,
  isSubmitting = false,
}: CommentInputProps) {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit(content.trim());
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
          나
        </div>
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="댓글을 입력하세요..."
            rows={3}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
          />
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              disabled={!content.trim() || isSubmitting}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? "등록 중..." : "댓글 등록"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
