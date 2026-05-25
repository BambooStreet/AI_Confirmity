import { NextRequest } from "next/server";

export const ADMIN_PASSWORD = "2026";

/** 헤더(x-admin-password) 또는 쿼리(password)로 관리자 비밀번호를 확인한다. */
export function checkAdminAuth(request: NextRequest): boolean {
  const headerPw = request.headers.get("x-admin-password");
  const queryPw = new URL(request.url).searchParams.get("password");
  return (headerPw ?? queryPw) === ADMIN_PASSWORD;
}
