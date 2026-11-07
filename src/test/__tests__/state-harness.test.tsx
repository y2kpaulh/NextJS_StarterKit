import { describe, expect, it, vi } from "vitest";

import { StateHarness } from "@/components/harness/state-harness";
import { renderWithHarness, screen } from "@/test/harness";

describe("StateHarness 4-State UI Component", () => {
  it("transitions across Normal, Loading, Empty, and Error states interactively", async () => {
    const onRetry = vi.fn();
    const { user } = renderWithHarness(
      <StateHarness title="Test Widget" onRetry={onRetry}>
        <p>정상 데이터 콘텐츠</p>
      </StateHarness>,
    );

    // 1. Initial Normal state
    expect(screen.getByTestId("harness-normal-view")).toBeInTheDocument();
    expect(screen.getByText("정상 데이터 콘텐츠")).toBeInTheDocument();

    // 2. Switch to Loading state
    await user.click(screen.getByRole("button", { name: "Loading" }));
    expect(screen.getByTestId("harness-loading-view")).toBeInTheDocument();

    // 3. Switch to Empty state
    await user.click(screen.getByRole("button", { name: "Empty" }));
    expect(screen.getByTestId("harness-empty-view")).toBeInTheDocument();

    // 4. Switch to Error state and click Retry
    await user.click(screen.getByRole("button", { name: "Error" }));
    expect(screen.getByTestId("harness-error-view")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /다시 시도/i }));
    expect(onRetry).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("harness-normal-view")).toBeInTheDocument();
  });
});
