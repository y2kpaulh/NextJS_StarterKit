"use client";

import * as React from "react";
import { Activity } from "lucide-react";

import { StateHarness } from "@/components/harness/state-harness";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const RECENT_DEPLOYMENTS = [
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
] as const;

export function RecentDeploymentsTable() {
  return (
    <StateHarness
      title="최근 배포 파이프라인"
      description="4-State UI 하네스"
      emptyTitle="최근 배포 내역이 없습니다"
      errorTitle="배포 로그 서버 연결 실패"
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
              <TableHead>ID</TableHead>
              <TableHead>서비스</TableHead>
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
                <TableCell className="text-xs font-medium">
                  {row.service}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={row.status === "Success" ? "default" : "secondary"}
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
  );
}
