"use client";

import Link from "next/link";
import { Plus, RotateCcw } from "lucide-react";
import { toast } from "sonner";

import {
  AssetDataTable,
  AssetSummaryCards,
  useAssetStore,
} from "@/features/assets";
import { StateHarness } from "@/components/harness/state-harness";
import { Button } from "@/components/ui/button";

export default function AssetsListPage() {
  const { assets, updateAssetStatus, deleteAsset, resetAssets } =
    useAssetStore();

  return (
    <div className="mx-auto w-full max-w-7xl min-w-0 space-y-6 sm:space-y-8">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            자산 현황 검색 (TanStack Table)
          </h2>
          <p className="text-muted-foreground text-sm">
            단어 검색(자산코드·자산명·담당자·부서) 및 기간
            검색(시작일~종료일)으로 사내 입고·출고 자산을 실시간 조회합니다.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              resetAssets();
              toast.info(
                "더미 자산 데이터(24건)가 초기 상태로 복원되었습니다.",
              );
            }}
          >
            <RotateCcw className="size-4" />
            더미 데이터 초기화
          </Button>
          <Button size="sm" asChild>
            <Link href="/dashboard/assets/new">
              <Plus className="size-4" />
              신규 자산 등록
            </Link>
          </Button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <AssetSummaryCards assets={assets} />

      {/* TanStack Table wrapped in 4-State UI Harness */}
      <StateHarness
        title="자산 데이터 현황 검색 그리드 (shadcn/ui + TanStack Table)"
        description="단어 검색, 기간 검색(시작일~종료일), 정렬 및 페이지네이션을 테스트하세요"
        emptyTitle="등록된 자산 데이터가 없습니다"
        emptyDescription="우측 상단의 '신규 자산 등록' 버튼을 눌러 첫 자산을 입고하거나 더미 데이터를 복원하세요."
        errorTitle="자산 데이터베이스 조회에 실패했습니다"
        errorDescription="네트워크 연결을 확인하거나 다시 시도 버튼을 눌러 복구하세요."
      >
        <AssetDataTable
          assets={assets}
          onStatusChange={updateAssetStatus}
          onDelete={deleteAsset}
        />
      </StateHarness>
    </div>
  );
}
