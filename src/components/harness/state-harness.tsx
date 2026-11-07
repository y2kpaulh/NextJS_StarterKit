"use client";

import * as React from "react";
import {
  AlertTriangle,
  CheckCircle2,
  FlaskConical,
  Inbox,
  Loader2,
  RefreshCw,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { HarnessMode } from "@/store/use-app-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export interface StateHarnessProps {
  title?: string;
  description?: string;
  initialState?: HarnessMode;
  state?: HarnessMode;
  onStateChange?: (state: HarnessMode) => void;
  showControls?: boolean;
  children: React.ReactNode;
  loadingFallback?: React.ReactNode;
  emptyFallback?: React.ReactNode;
  errorFallback?: React.ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
  errorTitle?: string;
  errorDescription?: string;
  onRetry?: () => void;
  className?: string;
}

const HARNESS_MODES: {
  value: HarnessMode;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { value: "normal", label: "Normal", icon: CheckCircle2 },
  { value: "loading", label: "Loading", icon: Loader2 },
  { value: "empty", label: "Empty", icon: Inbox },
  { value: "error", label: "Error", icon: AlertTriangle },
];

export function StateHarness({
  title = "UI State Harness",
  description,
  initialState = "normal",
  state: controlledState,
  onStateChange,
  showControls = true,
  children,
  loadingFallback,
  emptyFallback,
  errorFallback,
  emptyTitle = "표시할 데이터가 없습니다",
  emptyDescription = "아직 생성된 항목이 없거나 검색 조건과 일치하는 결과가 없습니다.",
  errorTitle = "데이터를 불러오지 못했습니다",
  errorDescription = "일시적인 네트워크 오류 또는 서버 응답 지연이 발생했습니다.",
  onRetry,
  className,
}: StateHarnessProps) {
  const [internalState, setInternalState] =
    React.useState<HarnessMode>(initialState);

  const activeState = controlledState ?? internalState;

  const handleModeChange = (nextMode: HarnessMode) => {
    if (controlledState === undefined) {
      setInternalState(nextMode);
    }
    onStateChange?.(nextMode);
  };

  const handleRetry = () => {
    handleModeChange("normal");
    onRetry?.();
  };

  return (
    <div
      data-slot="state-harness"
      data-harness-state={activeState}
      className={cn(
        "bg-card text-card-foreground overflow-hidden rounded-xl border shadow-xs",
        className,
      )}
    >
      {showControls && (
        <div className="bg-muted/40 flex flex-wrap items-center justify-between gap-3 border-b px-4 py-2.5">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="bg-background gap-1.5 font-mono text-xs"
            >
              <FlaskConical className="text-primary size-3.5" />
              HARNESS
            </Badge>
            <span className="text-sm font-medium">{title}</span>
            {description && (
              <span className="text-muted-foreground hidden text-xs md:inline">
                — {description}
              </span>
            )}
          </div>
          <div
            role="group"
            aria-label="Harness state switcher"
            className="bg-background inline-flex items-center gap-1 rounded-lg border p-1"
          >
            {HARNESS_MODES.map((mode) => {
              const Icon = mode.icon;
              const isActive = activeState === mode.value;
              return (
                <button
                  key={mode.value}
                  type="button"
                  onClick={() => handleModeChange(mode.value)}
                  aria-pressed={isActive}
                  className={cn(
                    "inline-flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  <Icon
                    className={cn(
                      "size-3.5",
                      mode.value === "loading" && isActive && "animate-spin",
                    )}
                  />
                  {mode.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="p-6">
        {activeState === "normal" && (
          <div data-testid="harness-normal-view">{children}</div>
        )}

        {activeState === "loading" && (
          <div
            data-testid="harness-loading-view"
            role="status"
            aria-label="로딩 중"
          >
            {loadingFallback ?? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-8 w-24" />
                </div>
                <div className="space-y-2.5">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-4/5" />
                </div>
              </div>
            )}
          </div>
        )}

        {activeState === "empty" && (
          <div data-testid="harness-empty-view">
            {emptyFallback ?? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="bg-muted mb-3 flex size-12 items-center justify-center rounded-full">
                  <Inbox className="text-muted-foreground size-6" />
                </div>
                <h4 className="text-base font-semibold">{emptyTitle}</h4>
                <p className="text-muted-foreground mt-1 max-w-sm text-sm">
                  {emptyDescription}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => handleModeChange("normal")}
                >
                  샘플 데이터 불러오기
                </Button>
              </div>
            )}
          </div>
        )}

        {activeState === "error" && (
          <div data-testid="harness-error-view" role="alert">
            {errorFallback ?? (
              <div className="border-destructive/30 bg-destructive/5 flex flex-col items-center justify-center rounded-lg border py-10 text-center">
                <div className="bg-destructive/10 text-destructive mb-3 flex size-12 items-center justify-center rounded-full">
                  <AlertTriangle className="size-6" />
                </div>
                <h4 className="text-base font-semibold">{errorTitle}</h4>
                <p className="text-muted-foreground mt-1 max-w-sm text-sm">
                  {errorDescription}
                </p>
                <Button
                  variant="default"
                  size="sm"
                  className="mt-4 gap-1.5"
                  onClick={handleRetry}
                >
                  <RefreshCw className="size-3.5" />
                  다시 시도
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
