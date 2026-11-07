# Next.js v15 + Tailwind CSS v4 + shadcn/ui Starter Kit (Harness-Driven)

웹 개발을 즉시 시작할 수 있도록 설계된 **Next.js v15 App Router**, **TypeScript**, **Tailwind CSS v4 (CSS-first, `tailwind.config` 파일 없음)**, **shadcn/ui**, **lucide-react** 기반의 올인원 스타터 킷입니다.

모든 기능과 컴포넌트는 **하네스(Harness) 엔지니어링 방식**으로 개발·검증되도록 규칙과 인프라가 내장되어 있습니다.

---

## 기술 스택 (Tech Stack)

- **Framework**: Next.js v15 (App Router, React 19, TypeScript)
- **Database & ORM**: PostgreSQL 16 (Docker Compose) + Prisma ORM (`@prisma/client`, Global Singleton, Seed & Fallback Repository)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`, `src/app/globals.css` `@theme inline`, OKLCH 다크 모드, `tailwind.config` 미사용)
- **UI & Icons**: shadcn/ui (20종 핵심 프리미티브 내장), `@tanstack/react-table`, `lucide-react`, `next-themes`, `sonner`
- **Form & State**: `react-hook-form` + `zod` (`@hookform/resolvers`), `zustand` (`persist`)
- **Harness & Quality**: Vitest + React Testing Library (`renderWithHarness`), `<StateHarness />` (4-State UI 샌드박스), ESLint v9 + Prettier

---

## 빠른 시작 (Quick Start)

```bash
# 의존성 설치 (postinstall로 prisma generate 자동 실행)
npm install

# (선택) 로컬 PostgreSQL 컨테이너 실행 및 스키마/시드 반영
cp .env.example .env
docker compose up -d
npm run db:push
npm run db:seed

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
| `/dashboard` | 반응형 사이드바 대시보드, 자산 KPI 카드, **자산 등록·입고·출고(일/주/월/년) 변화 그래프** |
| `/dashboard/assets` | **shadcn/ui + TanStack Table** 기반 단어 검색 · 기간 검색(시작일~종료일) 자산 현황 화면 |
| `/dashboard/assets/new` | `react-hook-form` + `zod` 기반 신규 자산 및 입출고 등록 화면 |
| `/dashboard/settings` | `react-hook-form` + `zod` 기반 프로필 및 알림 설정 페이지 |
| `/login`, `/register` | 스키마 기반 유효성 검사가 적용된 로그인 및 회원가입 템플릿 |
| `/api/assets` | 자산 목록 필터링 조회(`GET`) 및 신규 자산 생성(`POST`) REST API |
| `/api/health/db` | Prisma + PostgreSQL 연결 상태 및 응답 지연(latency) 헬스체크 API |

---

## 프로젝트 폴더 구조 (Hybrid Feature-Sliced + Server/UI Separation)

```text
├── prisma/                  # [DB 인프라/DDL] schema.prisma 스키마 및 seed.ts 시드 스크립트
└── src/
    ├── app/                 # [라우팅 계층] Next.js App Router 페이지 및 API 엔드포인트
    │   ├── (marketing)/     # 랜딩(/) 및 컴포넌트 쇼케이스(/components)
    │   ├── (auth)/          # 인증 라우트 (/login, /register)
    │   ├── (dashboard)/     # 대시보드 (/dashboard, /assets, /settings)
    │   └── api/             # 백엔드 Route Handlers (/api/assets, /api/health/db)
    ├── server/              # [백엔드 전용 계층] Server-Only 데이터베이스 및 비즈니스 로직
    │   └── db/              # Prisma 싱글톤 클라이언트(client.ts) 및 도메인 레포지토리(repositories/)
    ├── features/            # [도메인 기능 계층] 도메인별 스키마 · 데이터 · 상태 · UI 컴포넌트 응집
    │   ├── assets/          # 자산 관리 도메인 (schemas, data, store, components)
    │   ├── auth/            # 인증 및 프로필 도메인 (schemas, components)
    │   └── deployments/     # 배포 파이프라인 도메인 (schemas, components)
    ├── components/          # [공통 UI 계층] 도메인 비종속 디자인 시스템
    │   ├── ui/              # shadcn/ui 프리미티브 (20종)
    │   ├── layout/          # 사이트 헤더 및 푸터
    │   ├── harness/         # 4-State UI 샌드박스 (<StateHarness />)
    │   └── providers/       # ThemeProvider 등 전역 컨텍스트
    ├── config/              # 사이트 메타데이터 및 네비게이션 설정 (site.ts)
    ├── hooks/               # 범용 커스텀 훅 (use-mounted.ts)
    ├── lib/                 # 순수 공통 유틸리티 (utils.ts)
    ├── store/               # 앱 전역 UI 상태 스토어 (use-app-store.ts)
    └── test/                # Vitest + Testing Library 하네스 및 통합 테스트
```

---

## 하네스(Harness) 개발 규칙

상세 규칙은 루트의 [AGENTS.md](./AGENTS.md), [GEMINI.md](./GEMINI.md) 및 [.agents/rules/harness.md](./.agents/rules/harness.md)에 정의되어 있습니다.
