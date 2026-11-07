import { beforeEach, describe, expect, it } from "vitest";

import { useAppStore } from "@/store/use-app-store";

describe("Zustand App Store Harness", () => {
  beforeEach(() => {
    useAppStore.setState({
      sidebarOpen: true,
      counter: 0,
      defaultHarnessState: "normal",
    });
  });

  it("increments, decrements, and resets counter deterministically", () => {
    const store = useAppStore.getState();
    store.increment();
    store.increment();
    expect(useAppStore.getState().counter).toBe(2);

    store.decrement();
    expect(useAppStore.getState().counter).toBe(1);

    store.resetCounter();
    expect(useAppStore.getState().counter).toBe(0);
  });

  it("toggles sidebarOpen state and updates defaultHarnessState", () => {
    const store = useAppStore.getState();
    expect(useAppStore.getState().sidebarOpen).toBe(true);

    store.toggleSidebar();
    expect(useAppStore.getState().sidebarOpen).toBe(false);

    store.setDefaultHarnessState("error");
    expect(useAppStore.getState().defaultHarnessState).toBe("error");
  });
});
