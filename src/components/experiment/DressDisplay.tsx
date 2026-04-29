"use client";

export default function DressDisplay() {
  return (
    <article className="mb-8">
      <div className="border-b border-gray-200 pb-4 mb-6">
        <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
          색 인지 논쟁
        </span>
        <h1 className="text-2xl font-bold text-gray-900 mt-2 leading-tight">
          이 드레스는 무슨 색으로 보이시나요?
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          한때 SNS에서 큰 논쟁이 됐던 그 드레스 사진입니다.
        </p>
      </div>

      <div className="flex items-center justify-center py-8 bg-gray-50 rounded-lg mb-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://i.namu.wiki/i/I9dFq8UhSE10BAFh1ydoWffrJ-2aXeAcYRSyrIOscwjvQ31J7Ybta1WFsSdjQZK7uoDriNBumP8tmH2jwLe_Ow.webp"
          alt="드레스 사진"
          className="max-h-[420px] w-auto object-contain rounded"
        />
      </div>
    </article>
  );
}
