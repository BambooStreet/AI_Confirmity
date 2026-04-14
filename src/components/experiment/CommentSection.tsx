"use client";

import { useState } from "react";
import type { PresetComment } from "@/data/comments";
import CommentItem from "./CommentItem";
import CommentInput from "./CommentInput";

type CommentSectionProps = {
  presetComments: PresetComment[];
  showAiLabel: boolean;
  participantId: string;
};

type UserComment = {
  id: string;
  author: string;
  content: string;
  timeAgo: string;
};

export default function CommentSection({
  presetComments,
  showAiLabel,
  participantId,
}: CommentSectionProps) {
  const [userComments, setUserComments] = useState<UserComment[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = async (content: string) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ participantId, content }),
      });

      if (res.ok) {
        const data = await res.json();
        setUserComments((prev) => [
          ...prev,
          {
            id: data.id,
            author: "나",
            content,
            timeAgo: "방금 전",
          },
        ]);
      }
    } catch {
      // 에러 시 로컬에만 추가
      setUserComments((prev) => [
        ...prev,
        {
          id: `local-${Date.now()}`,
          author: "나",
          content,
          timeAgo: "방금 전",
        },
      ]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalComments = presetComments.length + userComments.length;

  return (
    <div className="border-t border-gray-200 pt-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        댓글 <span className="text-blue-600">{totalComments}</span>
      </h3>

      <CommentInput onSubmit={handleSubmitComment} isSubmitting={isSubmitting} />

      <div className="mt-6">
        {/* 사용자 댓글 */}
        {userComments.map((comment) => (
          <CommentItem
            key={comment.id}
            author={comment.author}
            content={comment.content}
            timeAgo={comment.timeAgo}
            likes={0}
            showAiLabel={false}
          />
        ))}

        {/* 사전 댓글 */}
        {presetComments.map((comment) => (
          <CommentItem
            key={comment.id}
            author={comment.author}
            content={comment.content}
            timeAgo={comment.timeAgo}
            likes={comment.likes}
            showAiLabel={showAiLabel && comment.isAiGenerated}
          />
        ))}
      </div>
    </div>
  );
}
