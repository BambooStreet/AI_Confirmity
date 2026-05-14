# Neon DB 셋업 가이드

로컬 개발 환경에서 실험 데이터(참가자/응답/댓글)를 저장할 Postgres DB로 [Neon](https://neon.tech) serverless를 사용한다. 코드는 `pg.Pool + @prisma/adapter-pg` 조합으로 Neon의 표준 Postgres 엔드포인트에 그대로 붙는다.

## 1) Neon 콘솔에서 DB 생성

1. [console.neon.tech](https://console.neon.tech) 접속 후 새 프로젝트 생성 (예: `ai-conformity`)
2. **Connection Details** 화면에서 두 가지 connection string을 복사
   - **Pooled connection** — 호스트에 `-pooler`가 포함됨 → `DATABASE_URL`로 사용
   - **Direct connection** (poolless) → `DATABASE_URL_UNPOOLED`로 사용
3. 두 URL 모두 끝에 `?sslmode=require`가 붙어 있는지 확인

## 2) `.env` 파일 생성

프로젝트 루트(`/`)에 `.env` 파일을 만들고 Neon에서 복사한 값을 채워 넣는다.

```bash
DATABASE_URL="postgresql://USER:PASS@ep-xxx-pooler.region.aws.neon.tech/DB?sslmode=require"
DATABASE_URL_UNPOOLED="postgresql://USER:PASS@ep-xxx.region.aws.neon.tech/DB?sslmode=require"
```

`.env`는 이미 `.gitignore`에 등록되어 있어 커밋되지 않는다.

## 3) 스키마 적용

기존 마이그레이션(`prisma/migrations/20260414161200_init`)을 Neon DB에 적용한다.

```bash
npx prisma migrate deploy
```

신규 DB라 마이그레이션 히스토리가 없으면 다음으로 대체 가능하다.

```bash
npx prisma db push
```

## 4) dev 서버 재시작

```bash
# 기존 dev 종료(Ctrl+C) 후
rm -rf .next
npm run dev
```

`predev` 스크립트가 자동으로 `prisma generate`를 먼저 실행한다.

## 참고

- 현재 `src/lib/prisma.ts`는 `process.env.DATABASE_URL_UNPOOLED`를 직접 connection string으로 쓴다. Neon의 unpooled 엔드포인트는 동시 연결 한도가 상대적으로 낮으므로, 본격적으로 참가자 트래픽을 받기 시작하면 `DATABASE_URL`(pooled)로 전환하는 것을 권장한다.
- 무료 플랜 Neon DB는 일정 시간 미사용 시 cold start가 발생할 수 있다. 첫 요청에서 P1001(`DatabaseNotReachable`)이 잠깐 나타나면 재시도하면 된다.
- Neon이 아닌 로컬 Postgres로 전환하고 싶다면 Docker로 띄운 뒤 동일한 `.env` 키를 `postgresql://user:pass@localhost:5432/db`로 바꿔 주면 된다.
