"use client";

import * as React from "react";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowUpRight,
  Boxes,
  Coins,
} from "lucide-react";

import { calculateAssetSummary } from "@/features/assets/data/dummy-assets";
import type { AssetItem } from "@/features/assets/schemas/asset-schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface AssetSummaryCardsProps {
  assets: AssetItem[];
}

export function AssetSummaryCards({ assets }: AssetSummaryCardsProps) {
  const summary = React.useMemo(() => calculateAssetSummary(assets), [assets]);

  const metrics = [
    {
      title: "총 등록 자산 수량",
      value: `${summary.totalAssetsCount.toLocaleString()}대`,
      change: `관리 품목 총 ${summary.totalRecords}종`,
      icon: Boxes,
    },
    {
      title: "현재 입고 (보관 대기)",
      value: `${summary.inboundCount.toLocaleString()}대`,
      change: "즉시 부서 배정 가능 재고",
      icon: ArrowDownToLine,
    },
    {
      title: "현재 출고 (현업 사용중)",
      value: `${summary.outboundCount.toLocaleString()}대`,
      change: `점검/수리 ${summary.maintenanceCount}대 별도`,
      icon: ArrowUpFromLine,
    },
    {
      title: "총 자산 취득 가액",
      value: `₩${Math.round(summary.totalValue / 10000).toLocaleString()}만`,
      change: "+14.2% 전분기 대비 증가",
      icon: Coins,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-muted-foreground text-sm font-medium">
                {metric.title}
              </CardTitle>
              <Icon className="text-muted-foreground size-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-muted-foreground mt-1 flex items-center gap-1 text-xs">
                <ArrowUpRight className="text-primary size-3.5" />
                {metric.change}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
