"use client";

type CommentItemProps = {
  author: string;
  content: string;
  timeAgo: string;
  likes: number;
  showAiLabel: boolean;
};

export default function CommentItem({
  author,
  content,
  timeAgo,
  likes,
  showAiLabel,
}: CommentItemProps) {
  return (
    <div className="py-4 border-b border-gray-100 last:border-b-0">
      <div className="flex items-center gap-2 mb-2">
        {/* 아바타 */}
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold text-gray-600">
          {author[0]}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-900">{author}</span>
          {showAiLabel && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-700 border border-purple-200">
              AI
            </span>
          )}
        </div>
        <span className="text-xs text-gray-400 ml-auto">{timeAgo}</span>
      </div>
      <p className="text-sm text-gray-700 leading-relaxed pl-10">{content}</p>
      <div className="flex items-center gap-4 mt-2 pl-10">
        <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-blue-500 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
          <span>{likes}</span>
        </button>
        <button className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
          답글
        </button>
      </div>
    </div>
  );
}
