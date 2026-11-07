# Harness Engineering Workflow & Rules (`.agents/rules/harness.md`)

이 문서는 워크스페이스 내 모든 코드 작성, 리팩터링, 버그 수정 시 적용되는 **하네스 엔지니어링(Harness Engineering)** 세부 규칙을 정의합니다.

---

## 1. 하네스 개발 워크플로우 (The Harness Loop)

```
[1. 계약 정의 (Zod/TS)] ──> [2. 4-상태 UI & 로직 구현] ──> [3. 테스트 하네스 검증] ──> [4. npm run verify 게이트]
         ^                                                                                      │
         └────────────────────────── (실패 시 로그 기반 자기 교정) <────────────────────────────┘
```

### 1.1 계약 및 스키마 우선 (Contract-First)
- 입력 폼, API 페이로드, 상태 스토어의 데이터 구조는 구현 코드보다 먼저 정의합니다.
- 위치:
  - Zod 유효성 스키마: `src/lib/validations/*.ts`
  - 전역 상태 스토어 인터페이스: `src/store/*.ts`
  - 사이트 및 네비게이션 설정: `src/config/site.ts`

### 1.2 UI 컴포넌트 하네스 규칙 (`<StateHarness />`)
- 비동기 데이터나 상태에 의존하는 UI 컴포넌트는 해피 패스(Happy Path)만 구현해서는 안 됩니다.
- 반드시 아래 4가지 상태 슬롯 또는 분기를 제공해야 합니다:
  - **Normal**: 데이터가 정상적으로 로드된 기본 뷰
  - **Loading**: 레이아웃 시프트(CLS)를 방지하는 `Skeleton` 뷰
  - **Empty**: 데이터가 0건일 때의 안내 아이콘, 설명, 생성/초기화 버튼
  - **Error**: 에러 메시지 및 재시도(`onRetry`) 액션 버튼
- 새로운 주요 위젯을 만들면 `/components` 페이지의 **UI Sandbox Harness** 탭이나 해당 페이지의 `<StateHarness />`에서 상태를 즉시 전환해 볼 수 있도록 연결합니다.

### 1.3 테스트 하네스 규칙 (`src/test/harness.tsx`)
- 테스트 파일은 `src/test/__tests__/*.test.{ts,tsx}`에 작성합니다.
- React 컴포넌트 테스트 시 `@testing-library/react`의 `render` 대신 `src/test/harness.tsx`의 `renderWithHarness`를 사용합니다:
  ```tsx
  import { renderWithHarness, screen } from "@/test/harness";

  it("renders component inside full provider harness", async () => {
    const { user } = renderWithHarness(<MyComponent />);
    await user.click(screen.getByRole("button"));
    // assertions...
  });
  ```
- Zod 스키마는 성공 케이스(Valid input)와 실패 케이스(Invalid email, short password, password mismatch 등 Edge case)를 모두 테스트합니다.

---

## 2. 코딩 컨벤션 및 금지 사항

1. **`tailwind.config.*` 생성 금지**: Tailwind v4의 `@tailwindcss/postcss` 및 `src/app/globals.css`의 `@theme inline`만 사용합니다.
2. **`any` 타입 사용 금지**: 모든 변수와 함수 시그니처는 명시적 타입 또는 타입 추론을 사용합니다.
3. **하드코딩된 색상 지양**: `bg-white`, `text-black` 대신 `bg-background`, `text-foreground`, `bg-card`, `text-muted-foreground`, `border-border` 등 시맨틱 테마 토큰을 사용하여 라이트/다크 모드가 완벽히 호환되도록 합니다.
4. **접근성(a11y) 준수**: 아이콘 단독 버튼에는 반드시 `<span className="sr-only">설명</span>` 또는 `aria-label`을 포함합니다.
