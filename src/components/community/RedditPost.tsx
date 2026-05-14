"use client";

type RedditPostProps = {
  subreddit: string;
  postedBy: string;
  postedAgo: string;
  title: string;
  score: number;
  commentCount: number;
  children?: React.ReactNode;
};

export default function RedditPost({
  subreddit,
  postedBy,
  postedAgo,
  title,
  score,
  commentCount,
  children,
}: RedditPostProps) {
  return (
    <article className="bg-white border border-gray-200 rounded-md overflow-hidden">
      <div className="flex">
        {/* Vote rail */}
        <div className="hidden sm:flex flex-col items-center gap-1 px-2 py-3 bg-gray-50 border-r border-gray-200 w-12 shrink-0">
          <button
            type="button"
            className="text-gray-400 hover:text-orange-500 transition-colors"
            aria-label="upvote"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 3l7 8h-4v6H7v-6H3l7-8z" />
            </svg>
          </button>
          <span className="text-xs font-bold text-gray-700">{score}</span>
          <button
            type="button"
            className="text-gray-400 hover:text-blue-500 transition-colors"
            aria-label="downvote"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 17l-7-8h4V3h6v6h4l-7 8z" />
            </svg>
          </button>
        </div>

        {/* Main content */}
        <div className="flex-1 p-4">
          <div className="flex flex-wrap items-center gap-x-2 text-xs text-gray-500 mb-2">
            <span className="font-bold text-gray-900">r/{subreddit}</span>
            <span>•</span>
            <span>Posted by u/{postedBy}</span>
            <span>{postedAgo}</span>
          </div>

          <h1 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug mb-3">
            {title}
          </h1>

          {children && <div className="text-sm text-gray-800">{children}</div>}

          <div className="flex items-center gap-4 mt-4 text-xs text-gray-500 font-semibold">
            <span className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-gray-100">
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M3 6a3 3 0 013-3h8a3 3 0 013 3v6a3 3 0 01-3 3H9l-4 3v-3a3 3 0 01-2-3V6z" />
              </svg>
              {commentCount} Comments
            </span>
            <span className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-gray-100">
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M4 12v3a1 1 0 001 1h10a1 1 0 001-1v-3M10 3v10m0-10l-3 3m3-3l3 3" />
              </svg>
              Share
            </span>
            <span className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-gray-100">
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M5 3a1 1 0 00-1 1v13l6-4 6 4V4a1 1 0 00-1-1H5z" />
              </svg>
              Save
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
