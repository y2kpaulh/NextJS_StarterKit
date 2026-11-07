"use client";

import Link from "next/link";
import { Plus, Search, Settings } from "lucide-react";

import {
  AssetSummaryCards,
  AssetTrendChart,
  RecentAssetsCard,
  useAssetStore,
} from "@/features/assets";
import { RecentDeploymentsTable } from "@/features/deployments";
import { StateHarness } from "@/components/harness/state-harness";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { assets } = useAssetStore();

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Top Action Bar */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            자산 및 서비스 통합 대시보드
          </h2>
          <p className="text-muted-foreground text-sm">
            사내 자산 등록 현황과 입고·출고(일/주/월/년) 추이 그래프 및 배포
            파이프라인을 한눈에 확인하세요.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/assets">
              <Search className="size-4" />
              자산 현황 검색
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/settings">
              <Settings className="size-4" />
              환경 설정
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/dashboard/assets/new">
              <Plus className="size-4" />
              신규 자산 등록
            </Link>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <AssetSummaryCards assets={assets} />

      {/* Asset Registration, Inbound & Outbound Trend Chart (Day / Week / Month / Year) */}
      <StateHarness
        title="자산 등록 현황 · 입고 · 출고 변화 그래프 (일 / 주 / 월 / 년)"
        description="일별, 주별, 월별, 년별 탭과 막대/꺾은선 모드를 전환하며 입출고 추이를 분석하세요"
        emptyTitle="집계된 자산 입출고 추이 데이터가 없습니다"
        emptyDescription="신규 자산을 등록하면 일·주·월·년 변화 그래프가 자동으로 생성됩니다."
        errorTitle="자산 시계열 통계 데이터를 불러오지 못했습니다"
        errorDescription="통계 집계 워커 응답이 지연되었습니다. 다시 시도 버튼을 눌러 복구하세요."
      >
        <AssetTrendChart assets={assets} defaultTimeframe="month" />
      </StateHarness>

      {/* Recent Assets & Recent Deployments Grid */}
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-7">
          <RecentAssetsCard assets={assets} />
        </div>

        <div className="min-w-0 lg:col-span-5">
          <RecentDeploymentsTable />
        </div>
      </div>
    </div>
  );
}
