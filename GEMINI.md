# GEMINI.md — Antigravity Agent Harness Rules

이 프로젝트에서 작업하는 모든 에이전트는 루트의 [AGENTS.md](./AGENTS.md) 및 [.agents/rules/harness.md](./.agents/rules/harness.md)에 정의된 **하네스(Harness) 개발 방식**을 엄격히 준수해야 합니다.

## 핵심 준수 사항 요약
1. **No `tailwind.config` File**: Tailwind CSS v4 CSS-first 방식을 사용합니다. 모든 테마 확장은 `src/app/globals.css`의 `@theme inline`에서 수행합니다.
2. **Schema First**: 폼과 데이터 모델은 `src/lib/validations/`에 Zod 스키마부터 작성합니다.
3. **4-State UI Harness**: 데이터 기반 UI는 `normal`, `loading`, `empty`, `error` 4가지 상태를 모두 구현하고 `<StateHarness />`(`src/components/harness/state-harness.tsx`)로 격리 검증 가능해야 합니다.
4. **Test Harness (`renderWithHarness`)**: 단위/통합 테스트는 `src/test/harness.tsx`의 `renderWithHarness()`를 사용하여 `src/test/__tests__/`에 작성합니다.
5. **Verification Gate**: 모든 코드 변경 후 작업 종료 전 `npm run verify`를 실행하여 타입체크, 린트, 포맷, 테스트, 프로덕션 빌드가 모두 통과하는지 확인합니다.
