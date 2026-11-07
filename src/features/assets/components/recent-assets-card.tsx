"use client";

import Link from "next/link";

import {
  ASSET_CATEGORY_LABELS,
  ASSET_STATUS_LABELS,
  type AssetItem,
} from "@/features/assets/schemas/asset-schema";
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

export interface RecentAssetsCardProps {
  assets: AssetItem[];
  limit?: number;
}

export function RecentAssetsCard({ assets, limit = 5 }: RecentAssetsCardProps) {
  const recentAssets = assets.slice(0, limit);

  return (
    <Card className="min-w-0">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base">
            최근 등록 및 입출고 자산 내역
          </CardTitle>
          <CardDescription>
            단어 검색 및 기간 검색은 자산 현황 검색 화면에서 수행할 수 있습니다.
          </CardDescription>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/assets">전체 검색 ({assets.length}건)</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden sm:table-cell">자산 코드</TableHead>
              <TableHead>자산명</TableHead>
              <TableHead className="hidden md:table-cell">분류</TableHead>
              <TableHead>상태</TableHead>
              <TableHead className="hidden text-right sm:table-cell">
                등록일
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentAssets.map((asset) => (
              <TableRow key={asset.id}>
                <TableCell className="hidden font-mono text-xs font-semibold sm:table-cell">
                  {asset.assetCode}
                </TableCell>
                <TableCell className="max-w-[160px] truncate font-medium sm:max-w-[200px]">
                  <div className="text-muted-foreground font-mono text-[11px] sm:hidden">
                    {asset.assetCode} · {asset.registeredAt}
                  </div>
                  <div className="truncate">{asset.name}</div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant="outline" className="text-xs">
                    {ASSET_CATEGORY_LABELS[asset.category]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      asset.status === "OUTBOUND" ? "default" : "secondary"
                    }
                  >
                    {ASSET_STATUS_LABELS[asset.status]}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground hidden text-right font-mono text-xs sm:table-cell">
                  {asset.registeredAt}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
