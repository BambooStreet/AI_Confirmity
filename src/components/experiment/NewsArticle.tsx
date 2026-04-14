"use client";

import { newsArticle } from "@/data/article";

export default function NewsArticle() {
  return (
    <article className="mb-8">
      {/* 헤더 */}
      <div className="border-b border-gray-200 pb-4 mb-4">
        <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
          {newsArticle.source}
        </span>
        <h1 className="text-2xl font-bold text-gray-900 mt-2 leading-tight">
          {newsArticle.title}
        </h1>
        <div className="flex items-center gap-3 mt-3 text-sm text-gray-500">
          <span>{newsArticle.author} 기자</span>
          <span>|</span>
          <span>{newsArticle.date}</span>
        </div>
      </div>

      {/* YouTube 영상 */}
      <div className="relative w-full aspect-video mb-6 bg-black rounded-lg overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${newsArticle.youtubeVideoId}`}
          title={newsArticle.title}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* 기사 본문 */}
      <div className="prose prose-gray max-w-none">
        {newsArticle.content.split("\n\n").map((paragraph, index) => (
          <p key={index} className="text-base leading-7 text-gray-800 mb-4">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}
