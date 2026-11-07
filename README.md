# Next.js v15 + Tailwind CSS v4 + shadcn/ui Starter Kit (Harness-Driven)

웹 개발을 즉시 시작할 수 있도록 설계된 **Next.js v15 App Router**, **TypeScript**, **Tailwind CSS v4 (CSS-first, `tailwind.config` 파일 없음)**, **shadcn/ui**, **lucide-react** 기반의 올인원 스타터 킷입니다.

모든 기능과 컴포넌트는 **하네스(Harness) 엔지니어링 방식**으로 개발·검증되도록 규칙과 인프라가 내장되어 있습니다.

---

## 기술 스택 (Tech Stack)

- **Framework**: Next.js v15 (App Router, React 19, TypeScript)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`, `src/app/globals.css` `@theme inline`, OKLCH 다크 모드, `tailwind.config` 미사용)
- **UI & Icons**: shadcn/ui (20종 핵심 프리미티브 내장), `lucide-react`, `next-themes`, `sonner`
- **Form & State**: `react-hook-form` + `zod` (`@hookform/resolvers`), `zustand` (`persist`)
- **Harness & Quality**: Vitest + React Testing Library (`renderWithHarness`), `<StateHarness />` (4-State UI 샌드박스), ESLint v9 + Prettier

---

## 빠른 시작 (Quick Start)

```bash
# 의존성 설치
npm install

# 로컬 개발 서버 실행
npm run dev

# 하네스 통합 검증 게이트 (Typecheck + Lint + Prettier + Vitest + Build)
npm run verify
```

---

## 주요 라우트 구성

| 경로 | 설명 |
| :--- | :--- |
| `/` | 모던 마케팅 랜딩 페이지 (Hero, Features, 하네스 4단계 워크플로우 소개) |
| `/components` | 인터랙티브 컴포넌트 쇼케이스 & **4-State UI 샌드박스 하네스 워크벤치** |
| `/dashboard` | 반응형 접이식 사이드바 대시보드, KPI 카드, 하네스 적용 배포 테이블 |
| `/dashboard/settings` | `react-hook-form` + `zod` 기반 프로필 및 알림 설정 페이지 |
| `/login`, `/register` | 스키마 기반 유효성 검사가 적용된 로그인 및 회원가입 템플릿 |

---

## 하네스(Harness) 개발 규칙

상세 규칙은 루트의 [AGENTS.md](./AGENTS.md), [GEMINI.md](./GEMINI.md) 및 [.agents/rules/harness.md](./.agents/rules/harness.md)에 정의되어 있습니다.
