This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## 실험 진입 경로

실험은 루트(`/`)에 `condition` 쿼리 파라미터를 붙여 시작합니다.

**URL 형식**: `/?condition=<조건키>`

**예시**: [http://localhost:3000/?condition=ai_10](http://localhost:3000/?condition=ai_10)

### 유효한 조건키 (총 6종)

| 조건키 | AI 라벨 | 댓글 수 |
| --- | --- | --- |
| `ai_10` | 표시 | 10 |
| `ai_20` | 표시 | 20 |
| `ai_30` | 표시 | 30 |
| `no_ai_10` | 미표시 | 10 |
| `no_ai_20` | 미표시 | 20 |
| `no_ai_30` | 미표시 | 30 |

진입 후 자동 흐름: `/consent` → `/pre-survey` → `/instruction` → `/experiment` → `/post-survey` → `/debrief`

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
