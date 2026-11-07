"use client";

import * as React from "react";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  CreditCard,
  Plus,
  Settings,
  Users,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StateHarness } from "@/components/harness/state-harness";

const METRICS = [
  {
    title: "월간 활성 사용자 (MAU)",
    value: "24,890",
    change: "+18.4% 전월 대비",
    icon: Users,
  },
  {
    title: "API 평균 응답 속도",
    value: "42ms",
    change: "-12ms 최적화 달성",
    icon: Zap,
  },
  {
    title: "하네스 검증 통과율",
    value: "100%",
    change: "Type + Lint + Test + Build",
    icon: CheckCircle2,
  },
  {
    title: "월간 구독 전환율",
    value: "6.8%",
    change: "+1.2% 상승",
    icon: CreditCard,
  },
];

const RECENT_DEPLOYMENTS = [
  {
    id: "DEP-904",
    service: "web-frontend-v15",
    environment: "Production",
    commit: "feat: add 4-state UI harness",
    status: "Success",
    timestamp: "방금 전",
  },
  {
    id: "DEP-903",
    service: "auth-validation-worker",
    environment: "Staging",
    commit: "refactor: zod schema contract",
    status: "Success",
    timestamp: "15분 전",
  },
  {
    id: "DEP-902",
    service: "design-tokens-v4",
    environment: "Production",
    commit: "style: oklch dark theme variables",
    status: "Success",
    timestamp: "1시간 전",
  },
  {
    id: "DEP-901",
    service: "analytics-pipeline",
    environment: "Preview",
    commit: "test: add renderWithHarness suite",
    status: "Review",
    timestamp: "3시간 전",
  },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Top Action Bar */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">프로젝트 현황</h2>
          <p className="text-muted-foreground text-sm">
            실시간 서비스 지표와 최근 배포 파이프라인 상태를 확인하세요.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/settings">
              <Settings className="size-4" />
              환경 설정
            </Link>
          </Button>
          <Button
            size="sm"
            onClick={() =>
              toast.success("새 배포 파이프라인이 트리거되었습니다.", {
                description: "하네스 자동 검증 게이트를 실행 중입니다.",
              })
            }
          >
            <Plus className="size-4" />새 배포 실행
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {METRICS.map((metric) => {
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

      {/* Recent Deployments Table wrapped in 4-State UI Harness */}
      <StateHarness
        title="최근 배포 및 하네스 검증 내역"
        description="상단 버튼으로 Normal / Loading / Empty / Error 상태를 즉시 테스트해 보세요"
        emptyTitle="최근 배포 내역이 없습니다"
        emptyDescription="우측 상단의 '새 배포 실행' 버튼을 눌러 첫 파이프라인을 시작하세요."
        errorTitle="배포 로그 서버에 연결할 수 없습니다"
        errorDescription="일시적인 타임아웃이 발생했습니다. 다시 시도 버튼을 눌러 복구하세요."
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="text-primary size-4" />
              <span className="text-sm font-semibold">
                실시간 파이프라인 로그
              </span>
            </div>
            <Badge variant="secondary">총 {RECENT_DEPLOYMENTS.length}건</Badge>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>배포 ID</TableHead>
                <TableHead>서비스</TableHead>
                <TableHead>환경</TableHead>
                <TableHead>커밋 요약</TableHead>
                <TableHead>상태</TableHead>
                <TableHead className="text-right">시간</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {RECENT_DEPLOYMENTS.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-mono text-xs font-medium">
                    {row.id}
                  </TableCell>
                  <TableCell className="font-medium">{row.service}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{row.environment}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground font-mono text-xs">
                    {row.commit}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        row.status === "Success" ? "default" : "secondary"
                      }
                    >
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-right text-xs">
                    {row.timestamp}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </StateHarness>

      {/* Quick Guide Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            스타터 킷 커스터마이징 가이드
          </CardTitle>
          <CardDescription>
            새로운 대시보드 페이지를 추가할 때 아래 하네스 규칙을 따라주세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-muted-foreground grid gap-4 text-sm md:grid-cols-3">
          <div className="bg-muted/40 rounded-lg border p-3.5">
            <p className="text-foreground font-medium">1. 스키마 정의</p>
            <p className="mt-1 text-xs">
              <code>src/lib/validations/</code>에 API 응답 및 폼 입력을 위한 Zod
              스키마를 먼저 작성합니다.
            </p>
          </div>
          <div className="bg-muted/40 rounded-lg border p-3.5">
            <p className="text-foreground font-medium">2. StateHarness 적용</p>
            <p className="mt-1 text-xs">
              테이블이나 차트 위젯을 <code>&lt;StateHarness /&gt;</code>로 감싸
              로딩/에러/빈 상태를 보장합니다.
            </p>
          </div>
          <div className="bg-muted/40 rounded-lg border p-3.5">
            <p className="text-foreground font-medium">3. npm run verify</p>
            <p className="mt-1 text-xs">
              커밋 전 단일 검증 명령어로 타입, 린트, 테스트, 빌드를 한 번에
              확인합니다.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
