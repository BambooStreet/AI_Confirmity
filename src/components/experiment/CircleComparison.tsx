"use client";

export default function CircleComparison() {
  return (
    <article className="mb-8">
      <div className="border-b border-gray-200 pb-4 mb-6">
        <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
          시각 인지 테스트
        </span>
        <h1 className="text-2xl font-bold text-gray-900 mt-2 leading-tight">
          두 원의 크기를 비교해보세요
        </h1>
      </div>

      <div className="flex items-center justify-center gap-12 md:gap-20 py-12 bg-gray-50 rounded-lg mb-6">
        <div className="flex flex-col items-center gap-3">
          <div
            className="rounded-full bg-blue-500"
            style={{ width: 180, height: 180 }}
            aria-label="왼쪽 원"
          />
          <span className="text-sm font-semibold text-gray-700">왼쪽</span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <div
            className="rounded-full bg-blue-500"
            style={{ width: 220, height: 220 }}
            aria-label="오른쪽 원"
          />
          <span className="text-sm font-semibold text-gray-700">오른쪽</span>
        </div>
      </div>
    </article>
  );
}
