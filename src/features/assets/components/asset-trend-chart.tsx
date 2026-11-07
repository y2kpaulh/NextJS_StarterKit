"use client";

import * as React from "react";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  CalendarRange,
  PackagePlus,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { computeAssetTrends } from "@/features/assets/data/dummy-assets";
import {
  ASSET_TIMEFRAME_LABELS,
  type AssetItem,
  type AssetTimeframe,
} from "@/features/assets/schemas/asset-schema";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface AssetTrendChartProps {
  assets: AssetItem[];
  defaultTimeframe?: AssetTimeframe;
}

type SeriesFilter = "all" | "registered" | "inbound" | "outbound";

interface Coord {
  x: number;
  y: number;
}

function buildSmoothSplinePath(points: Coord[]): string {
  if (points.length === 0) return "";
  if (points.length === 1) {
    return `M ${points[0]!.x.toFixed(1)} ${points[0]!.y.toFixed(1)}`;
  }

  let path = `M ${points[0]!.x.toFixed(1)} ${points[0]!.y.toFixed(1)}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i]!;
    const p1 = points[i]!;
    const p2 = points[i + 1]!;
    const p3 = points[i + 2] ?? p2;

    const tension = 0.22;
    const cp1x = p1.x + (p2.x - p0.x) * tension;
    const cp1y = p1.y + (p2.y - p0.y) * tension;
    const cp2x = p2.x - (p3.x - p1.x) * tension;
    const cp2y = p2.y - (p3.y - p1.y) * tension;

    path += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }

  return path;
}

function buildSmoothAreaPath(points: Coord[], baselineY: number): string {
  if (points.length === 0) return "";
  const linePath = buildSmoothSplinePath(points);
  const first = points[0]!;
  const last = points[points.length - 1]!;
  return `${linePath} L ${last.x.toFixed(1)} ${baselineY.toFixed(1)} L ${first.x.toFixed(1)} ${baselineY.toFixed(1)} Z`;
}

export function AssetTrendChart({
  assets,
  defaultTimeframe = "month",
}: AssetTrendChartProps) {
  const [timeframe, setTimeframe] =
    React.useState<AssetTimeframe>(defaultTimeframe);
  const [seriesFilter, setSeriesFilter] = React.useState<SeriesFilter>("all");
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const data = React.useMemo(
    () => computeAssetTrends(assets, timeframe),
    [assets, timeframe],
  );

  const maxValue = React.useMemo(() => {
    const rawMax = Math.max(
      ...data.flatMap((d) => [d.registered, d.inbound, d.outbound]),
      10,
    );
    return Math.ceil(rawMax * 1.15);
  }, [data]);

  const totals = React.useMemo(() => {
    return data.reduce(
      (acc, cur) => {
        acc.registered += cur.registered;
        acc.inbound += cur.inbound;
        acc.outbound += cur.outbound;
        return acc;
      },
      { registered: 0, inbound: 0, outbound: 0 },
    );
  }, [data]);

  const effectiveIndex =
    activeIndex !== null && data[activeIndex]
      ? activeIndex
      : Math.max(0, data.length - 1);

  const highlightedPoint = data[effectiveIndex];

  const showRegistered =
    seriesFilter === "all" || seriesFilter === "registered";
  const showInbound = seriesFilter === "all" || seriesFilter === "inbound";
  const showOutbound = seriesFilter === "all" || seriesFilter === "outbound";

  const svgWidth = 760;
  const svgHeight = 260;
  const padLeft = 48;
  const padRight = 24;
  const padTop = 24;
  const padBottom = 22;
  const plotWidth = svgWidth - padLeft - padRight;
  const plotHeight = svgHeight - padTop - padBottom;
  const baselineY = padTop + plotHeight;

  const yTicks = [1, 0.75, 0.5, 0.25, 0].map((ratio) => ({
    value: Math.round(maxValue * ratio),
    y: padTop + plotHeight * (1 - ratio),
  }));

  const getPoints = React.useCallback(
    (key: "registered" | "inbound" | "outbound"): Coord[] => {
      return data.map((d, idx) => {
        const x =
          data.length === 1
            ? padLeft + plotWidth / 2
            : padLeft + (idx / (data.length - 1)) * plotWidth;
        const y = baselineY - (d[key] / maxValue) * plotHeight;
        return { x, y };
      });
    },
    [data, maxValue, padLeft, plotWidth, baselineY, plotHeight],
  );

  const regPoints = React.useMemo(() => getPoints("registered"), [getPoints]);
  const inPoints = React.useMemo(() => getPoints("inbound"), [getPoints]);
  const outPoints = React.useMemo(() => getPoints("outbound"), [getPoints]);

  const activeX = regPoints[effectiveIndex]?.x ?? padLeft;

  return (
    <div className="w-full min-w-0 space-y-5" data-testid="asset-trend-chart">
      <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5">
            <CalendarRange className="text-primary size-4" />
            <span className="text-sm font-semibold">조회 주기:</span>
          </div>
          <Tabs
            value={timeframe}
            onValueChange={(val) => {
              setTimeframe(val as AssetTimeframe);
              setActiveIndex(null);
            }}
            className="w-full sm:w-auto"
          >
            <TabsList
              aria-label="자산 변화 그래프 기간 단위 선택"
              className="grid w-full grid-cols-4 sm:inline-flex sm:w-auto"
            >
              <TabsTrigger
                value="day"
                data-testid="timeframe-day"
                className="px-2 text-xs sm:px-3"
              >
                일별
              </TabsTrigger>
              <TabsTrigger
                value="week"
                data-testid="timeframe-week"
                className="px-2 text-xs sm:px-3"
              >
                주별
              </TabsTrigger>
              <TabsTrigger
                value="month"
                data-testid="timeframe-month"
                className="px-2 text-xs sm:px-3"
              >
                월별
              </TabsTrigger>
              <TabsTrigger
                value="year"
                data-testid="timeframe-year"
                className="px-2 text-xs sm:px-3"
              >
                년별
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Badge variant="secondary" className="text-xs">
            {ASSET_TIMEFRAME_LABELS[timeframe]}
          </Badge>
        </div>

        <div
          role="group"
          aria-label="데이터 지표 필터"
          className="bg-muted/50 inline-flex flex-wrap items-center gap-1 rounded-xl border p-1"
        >
          <button
            type="button"
            onClick={() => setSeriesFilter("all")}
            className={cn(
              "inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all",
              seriesFilter === "all"
                ? "bg-background text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Sparkles className="text-primary size-3" />
            <span>전체 흐름</span>
          </button>
          <button
            type="button"
            onClick={() => setSeriesFilter("registered")}
            className={cn(
              "inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all",
              seriesFilter === "registered"
                ? "bg-background text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <span className="size-2.5 rounded-full bg-gradient-to-r from-blue-500 via-emerald-400 to-orange-500" />
            <span>신규 등록</span>
          </button>
          <button
            type="button"
            onClick={() => setSeriesFilter("inbound")}
            className={cn(
              "inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all",
              seriesFilter === "inbound"
                ? "bg-background text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <span className="size-2.5 rounded-full bg-emerald-500" />
            <span>입고</span>
          </button>
          <button
            type="button"
            onClick={() => setSeriesFilter("outbound")}
            className={cn(
              "inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all",
              seriesFilter === "outbound"
                ? "bg-background text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <span className="size-2.5 rounded-full bg-indigo-500" />
            <span>출고</span>
          </button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-muted/25 relative overflow-hidden rounded-xl border p-3.5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-xs font-medium">
                기간 내 총 자산 등록
              </p>
              <p
                className="mt-1 text-xl font-bold"
                data-testid="trend-total-registered"
              >
                {totals.registered.toLocaleString()}건
              </p>
            </div>
            <div className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/15 via-emerald-500/15 to-orange-500/20 text-orange-500 dark:text-orange-400">
              <PackagePlus className="size-5" />
            </div>
          </div>
          <div className="mt-2.5 h-1 w-full rounded-full bg-gradient-to-r from-blue-500 via-emerald-400 to-orange-500 opacity-80" />
        </div>

        <div className="bg-muted/25 relative overflow-hidden rounded-xl border p-3.5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-xs font-medium">
                기간 내 누적 입고 (보관)
              </p>
              <p
                className="mt-1 text-xl font-bold"
                data-testid="trend-total-inbound"
              >
                {totals.inbound.toLocaleString()}건
              </p>
            </div>
            <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <ArrowDownToLine className="size-5" />
            </div>
          </div>
          <div className="mt-2.5 h-1 w-full rounded-full bg-gradient-to-r from-teal-400 to-emerald-500 opacity-80" />
        </div>

        <div className="bg-muted/25 relative overflow-hidden rounded-xl border p-3.5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-xs font-medium">
                기간 내 누적 출고 (배정)
              </p>
              <p
                className="mt-1 text-xl font-bold"
                data-testid="trend-total-outbound"
              >
                {totals.outbound.toLocaleString()}건
              </p>
            </div>
            <div className="flex size-9 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-600 dark:text-indigo-400">
              <ArrowUpFromLine className="size-5" />
            </div>
          </div>
          <div className="mt-2.5 h-1 w-full rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 opacity-80" />
        </div>

        {highlightedPoint && (
          <div className="bg-primary/5 border-primary/20 flex flex-col justify-between rounded-xl border p-3.5">
            <div className="flex items-center justify-between gap-2">
              <p className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium">
                <TrendingUp className="text-primary size-3.5" />
                <span>포커스 구간:</span>
                <strong className="text-foreground">
                  {highlightedPoint.label}
                </strong>
              </p>
              <Badge variant="outline" className="font-mono text-[11px]">
                순증 +{highlightedPoint.inbound - highlightedPoint.outbound}
              </Badge>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-orange-600 dark:text-orange-400">
                등록 <strong>{highlightedPoint.registered}</strong>
              </span>
              <span className="text-emerald-600 dark:text-emerald-400">
                입고 <strong>{highlightedPoint.inbound}</strong>
              </span>
              <span className="text-indigo-600 dark:text-indigo-400">
                출고 <strong>{highlightedPoint.outbound}</strong>
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="from-card via-card to-muted/20 relative overflow-hidden rounded-2xl border bg-gradient-to-b p-3 shadow-xs sm:p-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 left-1/2 h-44 w-3/4 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500/10 via-emerald-400/10 to-orange-500/10 blur-3xl"
        />

        {highlightedPoint && (
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 px-1 text-xs">
            <div className="flex items-center gap-2">
              <span className="bg-primary/10 text-primary inline-flex items-center gap-1 rounded-md px-2 py-0.5 font-semibold">
                {highlightedPoint.label} 상세 추이
              </span>
              <span className="text-muted-foreground hidden sm:inline">
                그래프의 곡선이나 하단 시점을 터치/호버하여 추이를 확인하세요.
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
              {showRegistered && (
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-gradient-to-r from-blue-500 to-orange-500" />
                  등록 <strong>{highlightedPoint.registered}건</strong>
                </span>
              )}
              {showInbound && (
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  입고 <strong>{highlightedPoint.inbound}건</strong>
                </span>
              )}
              {showOutbound && (
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-indigo-500" />
                  출고 <strong>{highlightedPoint.outbound}건</strong>
                </span>
              )}
            </div>
          </div>
        )}

        <div className="relative h-56 w-full sm:h-72">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="h-full w-full overflow-visible select-none"
            role="img"
            aria-label={`${ASSET_TIMEFRAME_LABELS[timeframe]} 자산 등록, 입고, 출고 추이 곡선 그래프`}
          >
            <defs>
              <linearGradient
                id="ag-registered-stroke"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="35%" stopColor="#10b981" />
                <stop offset="70%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>

              <linearGradient
                id="ag-registered-fill"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.32" />
                <stop offset="45%" stopColor="#10b981" stopOpacity="0.16" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
              </linearGradient>

              <linearGradient
                id="ag-inbound-stroke"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
              <linearGradient
                id="ag-inbound-fill"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.24" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
              </linearGradient>

              <linearGradient
                id="ag-outbound-stroke"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
              <linearGradient
                id="ag-outbound-fill"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.20" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
              </linearGradient>

              <filter
                id="ag-curve-glow"
                x="-10%"
                y="-20%"
                width="120%"
                height="150%"
              >
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {yTicks.map((tick, idx) => (
              <g key={idx}>
                <line
                  x1={padLeft}
                  y1={tick.y}
                  x2={svgWidth - padRight}
                  y2={tick.y}
                  stroke="var(--border)"
                  strokeWidth={idx === yTicks.length - 1 ? "1.2" : "1"}
                  strokeDasharray={idx === yTicks.length - 1 ? "none" : "4 4"}
                  opacity="0.7"
                />
                <text
                  x={padLeft - 10}
                  y={tick.y + 4}
                  textAnchor="end"
                  fill="var(--muted-foreground)"
                  fontSize="11"
                  fontFamily="var(--font-mono)"
                >
                  {tick.value}
                </text>
              </g>
            ))}

            <line
              x1={activeX}
              y1={padTop}
              x2={activeX}
              y2={baselineY}
              stroke="var(--primary)"
              strokeWidth="1.2"
              strokeDasharray="3 3"
              opacity="0.45"
            />

            {showOutbound && (
              <path
                d={buildSmoothAreaPath(outPoints, baselineY)}
                fill="url(#ag-outbound-fill)"
              />
            )}
            {showInbound && (
              <path
                d={buildSmoothAreaPath(inPoints, baselineY)}
                fill="url(#ag-inbound-fill)"
              />
            )}
            {showRegistered && (
              <path
                d={buildSmoothAreaPath(regPoints, baselineY)}
                fill="url(#ag-registered-fill)"
              />
            )}

            {showOutbound && (
              <path
                d={buildSmoothSplinePath(outPoints)}
                fill="none"
                stroke="url(#ag-outbound-stroke)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
            {showInbound && (
              <path
                d={buildSmoothSplinePath(inPoints)}
                fill="none"
                stroke="url(#ag-inbound-stroke)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
            {showRegistered && (
              <path
                d={buildSmoothSplinePath(regPoints)}
                fill="none"
                stroke="url(#ag-registered-stroke)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#ag-curve-glow)"
              />
            )}

            {data.map((point, idx) => {
              const isSelected = idx === effectiveIndex;
              const regPt = regPoints[idx]!;
              const inPt = inPoints[idx]!;
              const outPt = outPoints[idx]!;
              const colWidth = plotWidth / Math.max(1, data.length);

              return (
                <g
                  key={point.period}
                  className="cursor-pointer"
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => setActiveIndex(idx)}
                >
                  <rect
                    x={regPt.x - colWidth / 2}
                    y={padTop}
                    width={colWidth}
                    height={plotHeight}
                    fill="transparent"
                  />

                  {showOutbound && (
                    <circle
                      cx={outPt.x}
                      cy={outPt.y}
                      r={isSelected ? 5.5 : 3.2}
                      fill="var(--background)"
                      stroke="#6366f1"
                      strokeWidth={isSelected ? 3 : 2}
                    />
                  )}
                  {showInbound && (
                    <circle
                      cx={inPt.x}
                      cy={inPt.y}
                      r={isSelected ? 5.5 : 3.2}
                      fill="var(--background)"
                      stroke="#10b981"
                      strokeWidth={isSelected ? 3 : 2}
                    />
                  )}
                  {showRegistered && (
                    <circle
                      cx={regPt.x}
                      cy={regPt.y}
                      r={isSelected ? 6.5 : 3.8}
                      fill="var(--background)"
                      stroke="#f97316"
                      strokeWidth={isSelected ? 3.5 : 2.2}
                    />
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        <div
          className="mt-2 grid gap-1 border-t pt-2.5 pl-6 sm:pl-10"
          style={{
            gridTemplateColumns: `repeat(${data.length}, minmax(0, 1fr))`,
          }}
        >
          {data.map((point, idx) => {
            const isSelected = idx === effectiveIndex;
            const shortLabel = point.label.replace("25년 ", "'25.");
            const hideOnMobile =
              data.length > 8 &&
              idx % 2 === 1 &&
              idx !== data.length - 1 &&
              !isSelected;

            return (
              <button
                key={point.period}
                type="button"
                onClick={() => setActiveIndex(idx)}
                onMouseEnter={() => setActiveIndex(idx)}
                className={cn(
                  "cursor-pointer truncate rounded-md py-1 text-center text-[10px] font-medium transition-colors sm:text-xs",
                  hideOnMobile && "hidden sm:block",
                  isSelected
                    ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
                title={`${point.label}: 등록 ${point.registered}건 / 입고 ${point.inbound}건 / 출고 ${point.outbound}건`}
              >
                {shortLabel}
              </button>
            );
          })}
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t pt-3 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-5 rounded-full bg-gradient-to-r from-blue-500 via-emerald-400 to-orange-500" />
              <span className="font-medium">신규 자산 등록 추이</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-5 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-500" />
              <span className="font-medium">자산 입고 흐름</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-5 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500" />
              <span className="font-medium">자산 출고 흐름</span>
            </div>
          </div>
          <span className="text-muted-foreground text-[11px]">
            * 신규 자산 등록 시 해당 일·주·월·년 곡선 추이에 실시간 반영됩니다.
          </span>
        </div>
      </div>
    </div>
  );
}
