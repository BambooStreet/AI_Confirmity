"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { isValidCondition } from "@/lib/conditions";

function LandingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const condition = searchParams.get("condition");

    if (!condition) {
      setError("실험 조건이 지정되지 않았습니다. 올바른 링크로 접속해주세요.");
      setLoading(false);
      return;
    }

    if (!isValidCondition(condition)) {
      setError("유효하지 않은 실험 조건입니다. 올바른 링크로 접속해주세요.");
      setLoading(false);
      return;
    }

    // 참가자 생성 후 동의 페이지로 이동
    fetch("/api/participants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ condition }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          localStorage.setItem("participantId", data.id);
          localStorage.setItem("condition", condition);
          router.push("/consent");
        } else {
          setError("참가자 등록 중 오류가 발생했습니다.");
          setLoading(false);
        }
      })
      .catch(() => {
        setError("서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.");
        setLoading(false);
      });
  }, [searchParams, router]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-900 mb-4">접속 오류</h1>
          <p className="text-gray-600">{error}</p>
          <p className="text-sm text-gray-400 mt-4">
            유효한 URL 예시: /?condition=ai_10
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">실험 환경을 준비하고 있습니다...</p>
        </div>
      </div>
    );
  }

  return null;
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      }
    >
      <LandingContent />
    </Suspense>
  );
}
