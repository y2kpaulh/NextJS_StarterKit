# AGENTS.md — Harness-Driven Development Rules

이 저장소는 **Next.js v15 (App Router) + TypeScript + Tailwind CSS v4 (No `tailwind.config`) + shadcn/ui + lucide-react** 기반의 Starter Kit이며, 모든 기능 개발과 수정은 **하네스(Harness) 방식**으로 수행해야 합니다.

---

## 1. 핵심 기술 스택 및 아키텍처 불변성 (Invariants)

1. **Next.js v15 App Router**:
   - 모든 라우트는 `src/app/` 하위에 구성하며, 목적에 따라 라우트 그룹(`(marketing)`, `(auth)`, `(dashboard)`)으로 분리합니다.
   - 기본적으로 **React Server Components (RSC)**를 우선 사용하며, 브라우저 API나 이벤트 핸들러, 상태 훅(`useState`, `useForm`, `useAppStore`)이 필요한 경우에만 파일 최상단에 `"use client"`를 선언합니다.
2. **Tailwind CSS v4 (CSS-First Configuration)**:
   - **절대 `tailwind.config.js` 또는 `tailwind.config.ts` 파일을 생성하지 마십시오.**
   - 모든 테마 토큰(색상, 반경, 폰트, 애니메이션)과 다크 모드 변형(`@custom-variant dark (&:is(.dark *));`)은 `src/app/globals.css`의 `@theme inline` 블록과 `:root` / `.dark` CSS 변수(OKLCH)에서 관리합니다.
3. **shadcn/ui & lucide-react**:
   - 기본 UI 프리미티브는 `src/components/ui/`에 위치하며, 아이콘은 `lucide-react`만 일관되게 사용합니다.
   - 클래스 병합 시 반드시 `src/lib/utils.ts`의 `cn()` 유틸리티를 사용합니다.
4. **Prisma ORM & PostgreSQL**:
   - 데이터베이스 스키마는 루트의 `prisma/schema.prisma`에서 단일 소스로 관리하며, Prisma Client는 반드시 서버 전용 레이어인 `src/server/db/client.ts`(`@/server/db`)의 글로벌 싱글톤(`db` / `prisma`)을 통해 접근합니다.
   - DB에 저장·조회되는 도메인 데이터는 `src/features/<domain>/schemas/`에 Zod 스키마를 함께 정의하고, 백엔드 전용 레포지토리 계층(`src/server/db/repositories/`)을 통해 접근합니다.
5. **Hybrid Feature-Sliced + Server/UI Separation 폴더 아키텍처**:
   - **백엔드 전용 레이어 (`src/server/db/`)**: Prisma Client 싱글톤(`client.ts`)과 PostgreSQL 쿼리 레포지토리(`repositories/`)를 배치하여 서버 전용(Server-Only) 영역을 명확히 분리합니다.
   - **도메인 기능 (`src/features/<domain>/`)**: 비즈니스 도메인(`assets`, `auth`, `deployments` 등)의 `schemas/`, `data/`, `store/`, `components/`를 한 폴더 안에 응집(Co-location)합니다.
   - **라우트 셸 (`src/app/`)**: 라우팅, 레이아웃, API 엔드포인트(`api/`), 그리고 `src/features/*` 위젯 조합만 담당하며 무거운 폼·비즈니스 로직을 직접 포함하지 않습니다.
   - **공통 레이어 (`src/components/`, `src/lib/`, `src/store/`)**: 도메인에 종속되지 않는 범용 UI(`ui/`, `layout/`, `harness/`, `providers/`), 공통 유틸리티(`utils.ts`), 앱 전역 UI 상태(`use-app-store.ts`)만 배치합니다.

---

## 2. 하네스(Harness) 개발 4단계 프로토콜

모든 신규 기능, 폼, 페이지, 컴포넌트 개발 시 아래 4단계를 순서대로 준수합니다:

### Step 1: Schema & Contract First (스키마 및 타입 우선 정의)
- UI나 비즈니스 로직을 작성하기 전에 `src/features/<domain>/schemas/`에 **Zod 스키마**를 정의하거나 도메인 타입을 먼저 선언합니다.
- 폼 입력 데이터는 반드시 `z.infer<typeof schema>`를 통해 정적 타입과 런타임 검증을 단일 소스(Single Source of Truth)로 유지합니다.

### Step 2: 4-State UI Sandbox Harness (4-상태 UI 하네스 설계)
- 데이터를 표시하거나 비동기 작업을 수행하는 모든 UI 컴포넌트/섹션은 다음 4가지 상태를 명시적으로 설계해야 합니다:
  1. `normal`: 정상 데이터가 렌더링된 상태
  2. `loading`: 스켈레톤(`Skeleton`) 또는 스피너가 표시되는 로딩 상태
  3. `empty`: 데이터가 없을 때 안내 메시지와 CTA 액션을 제공하는 빈 상태
  4. `error`: 오류 원인과 재시도(Retry) 액션을 제공하는 에러 상태
- `src/components/harness/state-harness.tsx`의 `<StateHarness />` 컴포넌트를 사용하여 백엔드 연동 없이도 4가지 상태를 즉시 전환·검증할 수 있도록 구현합니다.

### Step 3: Automated Test Harness (자동화 테스트 하네스 작성)
- 모든 스키마, 상태 스토어(`src/store/`), 유틸리티(`src/lib/`), 핵심 UI 컴포넌트는 `src/test/__tests__/` 하위에 Vitest 테스트(`*.test.ts` / `*.test.tsx`)를 작성합니다.
- UI 컴포넌트 테스트 시 개별 Provider를 수동으로 감싸지 말고, 반드시 `src/test/harness.tsx`의 `renderWithHarness(ui, options)`를 사용하여 실제 앱과 동일한 컨텍스트(`ThemeProvider`, `TooltipProvider`, `Toaster`, `userEvent`)에서 검증합니다.

### Step 4: Deterministic Verification Gate (`npm run verify`)
- 작업을 완료하기 전 반드시 아래 단일 하네스 검증 명령어를 실행하여 100% 통과해야 합니다:
  ```bash
  npm run verify
  ```
- `npm run verify`는 순차적으로 다음 5가지를 검증합니다:
  1. `npm run typecheck` (`tsc --noEmit`)
  2. `npm run lint` (`eslint .`)
  3. `npm run format:check` (`prettier --check`)
  4. `npm run test:run` (`vitest run`)
  5. `npm run build` (`next build`)
- 어느 한 단계라도 실패할 경우, `@ts-ignore`나 `eslint-disable`로 우회하지 않고 근본 원인을 수정한 뒤 다시 `npm run verify`를 통과시켜야 합니다.
