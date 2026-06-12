"use client";

import { UI } from "@/i18n/ui";
import { useLang } from "@/lib/useLang";
import { avatarDataUri } from "@/lib/avatar";

type RedditCommentItemProps = {
  author: string;
  content: string;
  timeAgo: string;
  score: number;
  showAiLabel: boolean;
  isCurrentUser?: boolean;
};

export default function RedditCommentItem({
  author,
  content,
  timeAgo,
  score,
  showAiLabel,
  isCurrentUser = false,
}: RedditCommentItemProps) {
  const lang = useLang();
  return (
    <div className="flex gap-3 py-3">
      {/* Avatar + vertical thread line */}
      <div className="flex flex-col items-center shrink-0">
        {isCurrentUser ? (
          // 본인(OP)은 식별을 위해 파란 이니셜 원 유지
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-blue-500 text-white">
            {author[0]}
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarDataUri(author)}
            alt=""
            aria-hidden
            className="w-8 h-8 rounded-full bg-gray-100"
          />
        )}
        <div className="flex-1 w-px bg-gray-200 mt-1" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-x-2 text-xs">
          <span className="font-bold text-gray-900">u/{author}</span>
          {isCurrentUser && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700 border border-blue-200">
              OP
            </span>
          )}
          <span className="text-gray-400">•</span>
          <span className="text-gray-500">{timeAgo}</span>
        </div>

        {showAiLabel && (
          <p className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded text-xs font-bold text-red-700 bg-red-50 border border-red-200">
            <span aria-hidden className="text-sm">⚠️</span>
            {UI[lang].comment.aiLabel}
          </p>
        )}

        <p className="text-sm text-gray-800 leading-relaxed mt-1 whitespace-pre-wrap">
          {content}
        </p>

        <div className="flex items-center gap-1 mt-2 text-xs text-gray-500 font-semibold">
          <button
            type="button"
            className="p-1 rounded hover:bg-gray-100 hover:text-orange-500"
            aria-label="upvote"
          >
            <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 3l7 8h-4v6H7v-6H3l7-8z" />
            </svg>
          </button>
          <span className="px-0.5 text-gray-700">{score}</span>
          <button
            type="button"
            className="p-1 rounded hover:bg-gray-100 hover:text-blue-500"
            aria-label="downvote"
          >
            <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 17l-7-8h4V3h6v6h4l-7 8z" />
            </svg>
          </button>
          <button className="ml-2 px-2 py-1 rounded hover:bg-gray-100">
            Reply
          </button>
          <button className="px-2 py-1 rounded hover:bg-gray-100 hidden sm:inline">
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
