"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type RowSelectionState,
  type SortingState,
} from "@tanstack/react-table";
import {
  ArrowDownToLine,
  ArrowUpDown,
  ArrowUpFromLine,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  FilterX,
  MoreHorizontal,
  Search,
  Trash2,
  Wrench,
} from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { filterAssets } from "@/features/assets/data/dummy-assets";
import {
  ASSET_CATEGORY_LABELS,
  ASSET_STATUS_LABELS,
  type AssetCategory,
  type AssetItem,
  type AssetStatus,
} from "@/features/assets/schemas/asset-schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface AssetDataTableProps {
  assets: AssetItem[];
  onStatusChange?: (id: string, status: AssetStatus) => void;
  onDelete?: (id: string) => void;
}

interface ResponsiveColumnMeta {
  className?: string;
}

function getStatusBadgeVariant(
  status: AssetStatus,
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "INBOUND":
      return "secondary";
    case "OUTBOUND":
      return "default";
    case "MAINTENANCE":
      return "outline";
    case "DISPOSED":
      return "destructive";
  }
}

export function AssetDataTable({
  assets,
  onStatusChange,
  onDelete,
}: AssetDataTableProps) {
  const [keyword, setKeyword] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState<
    "ALL" | AssetCategory
  >("ALL");
  const [statusFilter, setStatusFilter] = React.useState<"ALL" | AssetStatus>(
    "ALL",
  );

  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "registeredAt", desc: true },
  ]);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  const hasDateOrderError = Boolean(
    startDate && endDate && startDate > endDate,
  );

  const filteredData = React.useMemo(() => {
    if (hasDateOrderError) return [];
    return filterAssets(assets, {
      keyword,
      startDate,
      endDate,
      category: categoryFilter,
      status: statusFilter,
    });
  }, [
    assets,
    keyword,
    startDate,
    endDate,
    categoryFilter,
    statusFilter,
    hasDateOrderError,
  ]);

  const applyDatePreset = (
    preset: "ALL" | "7D" | "30D" | "90D" | "YEAR_2026",
  ) => {
    if (preset === "ALL") {
      setStartDate("");
      setEndDate("");
      return;
    }
    const baseEnd = "2026-11-07";
    if (preset === "7D") {
      setStartDate("2026-11-01");
      setEndDate(baseEnd);
    } else if (preset === "30D") {
      setStartDate("2026-10-08");
      setEndDate(baseEnd);
    } else if (preset === "90D") {
      setStartDate("2026-08-09");
      setEndDate(baseEnd);
    } else if (preset === "YEAR_2026") {
      setStartDate("2026-01-01");
      setEndDate("2026-12-31");
    }
  };

  const resetFilters = () => {
    setKeyword("");
    setStartDate("");
    setEndDate("");
    setCategoryFilter("ALL");
    setStatusFilter("ALL");
    setRowSelection({});
  };

  const isFiltered = Boolean(
    keyword ||
    startDate ||
    endDate ||
    categoryFilter !== "ALL" ||
    statusFilter !== "ALL",
  );

  const columns = React.useMemo<ColumnDef<AssetItem>[]>(
    () => [
      {
        id: "select",
        meta: { className: "w-9 px-2" } satisfies ResponsiveColumnMeta,
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="페이지 내 모든 자산 선택"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label={`${row.original.name} 선택`}
          />
        ),
        enableSorting: false,
      },
      {
        accessorKey: "assetCode",
        header: "자산 코드",
        meta: {
          className: "hidden sm:table-cell",
        } satisfies ResponsiveColumnMeta,
        cell: ({ row }) => (
          <span className="font-mono text-xs font-semibold">
            {row.original.assetCode}
          </span>
        ),
      },
      {
        accessorKey: "name",
        meta: {
          className: "min-w-[160px] whitespace-normal",
        } satisfies ResponsiveColumnMeta,
        header: ({ column }) => (
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 text-xs font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            자산명 / 위치
            <ArrowUpDown className="ml-1 size-3.5" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="max-w-[200px] space-y-0.5 sm:max-w-[260px]">
            <div className="text-muted-foreground font-mono text-[11px] font-semibold sm:hidden">
              {row.original.assetCode} · {row.original.registeredAt}
            </div>
            <div className="line-clamp-1 font-medium">{row.original.name}</div>
            <div className="text-muted-foreground truncate text-xs">
              {row.original.location}
            </div>
            <div className="text-muted-foreground text-[11px] md:hidden">
              {row.original.department} ({row.original.assignee}) ·{" "}
              {row.original.quantity}대
            </div>
          </div>
        ),
      },
      {
        accessorKey: "category",
        header: "카테고리",
        meta: {
          className: "hidden md:table-cell",
        } satisfies ResponsiveColumnMeta,
        cell: ({ row }) => (
          <Badge variant="outline" className="text-xs font-normal">
            {ASSET_CATEGORY_LABELS[row.original.category]}
          </Badge>
        ),
      },
      {
        accessorKey: "status",
        header: "입출고 상태",
        cell: ({ row }) => {
          const status = row.original.status;
          return (
            <Badge
              variant={getStatusBadgeVariant(status)}
              className="text-[11px] sm:text-xs"
            >
              {ASSET_STATUS_LABELS[status]}
            </Badge>
          );
        },
      },
      {
        accessorKey: "department",
        header: "담당 부서 / 담당자",
        meta: {
          className: "hidden lg:table-cell",
        } satisfies ResponsiveColumnMeta,
        cell: ({ row }) => (
          <div className="text-xs">
            <div className="font-medium">{row.original.department}</div>
            <div className="text-muted-foreground">{row.original.assignee}</div>
          </div>
        ),
      },
      {
        accessorKey: "quantity",
        meta: {
          className: "hidden sm:table-cell",
        } satisfies ResponsiveColumnMeta,
        header: ({ column }) => (
          <div className="text-right">
            <Button
              variant="ghost"
              size="sm"
              className="-mr-3 h-8 text-xs font-semibold"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              수량
              <ArrowUpDown className="ml-1 size-3.5" />
            </Button>
          </div>
        ),
        cell: ({ row }) => (
          <div className="text-right font-mono text-xs font-medium">
            {row.original.quantity}대
          </div>
        ),
      },
      {
        accessorKey: "purchasePrice",
        meta: {
          className: "hidden xl:table-cell",
        } satisfies ResponsiveColumnMeta,
        header: ({ column }) => (
          <div className="text-right">
            <Button
              variant="ghost"
              size="sm"
              className="-mr-3 h-8 text-xs font-semibold"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              취득 단가
              <ArrowUpDown className="ml-1 size-3.5" />
            </Button>
          </div>
        ),
        cell: ({ row }) => (
          <div className="text-right font-mono text-xs">
            ₩{row.original.purchasePrice.toLocaleString()}
          </div>
        ),
      },
      {
        accessorKey: "registeredAt",
        meta: {
          className: "hidden md:table-cell",
        } satisfies ResponsiveColumnMeta,
        header: ({ column }) => (
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 text-xs font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            등록/입출고일
            <ArrowUpDown className="ml-1 size-3.5" />
          </Button>
        ),
        cell: ({ row }) => (
          <span className="text-muted-foreground font-mono text-xs">
            {row.original.registeredAt}
          </span>
        ),
      },
      {
        id: "actions",
        meta: { className: "w-10 text-right" } satisfies ResponsiveColumnMeta,
        header: () => <span className="sr-only">관리 액션</span>,
        cell: ({ row }) => {
          const asset = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  aria-label={`${asset.assetCode} 관리 메뉴`}
                >
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel className="font-mono text-xs">
                  {asset.assetCode} 상태 변경
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    onStatusChange?.(asset.id, "INBOUND");
                    toast.success(
                      `${asset.name} 상태가 [입고]로 변경되었습니다.`,
                    );
                  }}
                >
                  <ArrowDownToLine className="size-4" />
                  <span>입고 (보관중) 처리</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    onStatusChange?.(asset.id, "OUTBOUND");
                    toast.success(
                      `${asset.name} 상태가 [출고]로 변경되었습니다.`,
                    );
                  }}
                >
                  <ArrowUpFromLine className="size-4" />
                  <span>출고 (사용중) 처리</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    onStatusChange?.(asset.id, "MAINTENANCE");
                    toast.info(
                      `${asset.name} 상태가 [점검/수리]로 변경되었습니다.`,
                    );
                  }}
                >
                  <Wrench className="size-4" />
                  <span>점검/수리 전환</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={() => {
                    onDelete?.(asset.id);
                    toast.error(
                      `${asset.assetCode} 자산이 목록에서 삭제되었습니다.`,
                    );
                  }}
                >
                  <Trash2 className="size-4" />
                  <span>자산 삭제</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [onStatusChange, onDelete],
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full min-w-0 space-y-4" data-testid="asset-data-table">
      {/* Search & Date Range Filter Panel */}
      <div className="bg-muted/30 w-full min-w-0 space-y-4 rounded-xl border p-3 sm:p-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
          <div className="min-w-0 space-y-1.5 md:col-span-5">
            <Label htmlFor="asset-keyword-search" className="text-xs">
              단어 검색 (자산코드 · 자산명 · 담당자 · 부서 · 위치)
            </Label>
            <div className="relative">
              <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
              <Input
                id="asset-keyword-search"
                data-testid="asset-keyword-input"
                placeholder="예: MacBook, 김민수, 플랫폼개발팀, AST-2026..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="bg-background w-full pl-9"
              />
            </div>
          </div>

          <div className="min-w-0 space-y-1.5 md:col-span-3">
            <Label htmlFor="asset-category-filter" className="text-xs">
              자산 카테고리
            </Label>
            <Select
              value={categoryFilter}
              onValueChange={(val) =>
                setCategoryFilter(val as "ALL" | AssetCategory)
              }
            >
              <SelectTrigger
                id="asset-category-filter"
                className="bg-background w-full"
              >
                <SelectValue placeholder="전체 카테고리" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">전체 카테고리</SelectItem>
                {(Object.keys(ASSET_CATEGORY_LABELS) as AssetCategory[]).map(
                  (cat) => (
                    <SelectItem key={cat} value={cat}>
                      {ASSET_CATEGORY_LABELS[cat]}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="min-w-0 space-y-1.5 md:col-span-4">
            <Label htmlFor="asset-status-filter" className="text-xs">
              입출고 상태
            </Label>
            <Select
              value={statusFilter}
              onValueChange={(val) =>
                setStatusFilter(val as "ALL" | AssetStatus)
              }
            >
              <SelectTrigger
                id="asset-status-filter"
                className="bg-background w-full"
              >
                <SelectValue placeholder="전체 상태" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">전체 상태 (입고·출고·점검)</SelectItem>
                {(Object.keys(ASSET_STATUS_LABELS) as AssetStatus[]).map(
                  (st) => (
                    <SelectItem key={st} value={st}>
                      {ASSET_STATUS_LABELS[st]}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Date Range Search (기간 검색) + Quick Presets */}
        <div className="flex flex-col justify-between gap-3 border-t pt-3 xl:flex-row xl:items-end">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
            <div className="grid grid-cols-1 gap-2 sm:flex sm:items-end sm:gap-2">
              <div className="min-w-0 space-y-1">
                <Label
                  htmlFor="asset-start-date"
                  className="flex items-center gap-1 text-xs"
                >
                  <Calendar className="text-primary size-3.5" />
                  기간 검색 (시작일)
                </Label>
                <Input
                  id="asset-start-date"
                  data-testid="asset-start-date-input"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-background h-9 w-full font-mono text-xs sm:w-38"
                />
              </div>
              <span className="text-muted-foreground hidden pb-2 text-sm sm:inline">
                ~
              </span>
              <div className="min-w-0 space-y-1">
                <Label htmlFor="asset-end-date" className="text-xs">
                  종료일
                </Label>
                <Input
                  id="asset-end-date"
                  data-testid="asset-end-date-input"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-background h-9 w-full font-mono text-xs sm:w-38"
                />
              </div>
            </div>

            <div
              role="group"
              aria-label="빠른 기간 선택"
              className="grid grid-cols-2 gap-1.5 sm:flex sm:flex-wrap sm:items-center"
            >
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-9 text-xs"
                onClick={() => applyDatePreset("7D")}
              >
                최근 7일
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-9 text-xs"
                onClick={() => applyDatePreset("30D")}
              >
                최근 30일
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-9 text-xs"
                onClick={() => applyDatePreset("90D")}
              >
                최근 90일
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-9 text-xs"
                onClick={() => applyDatePreset("YEAR_2026")}
              >
                2026년 전체
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 sm:justify-start">
            {isFiltered && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                data-testid="reset-filters-button"
                className="h-9 gap-1.5 text-xs"
              >
                <FilterX className="size-3.5" />
                <span>검색 조건 초기화</span>
              </Button>
            )}
            <Badge
              variant="secondary"
              className="h-7 px-2.5 text-xs"
              data-testid="filtered-asset-count"
            >
              검색 결과 {filteredData.length}건 / 전체 {assets.length}건
            </Badge>
          </div>
        </div>

        {hasDateOrderError && (
          <p
            role="alert"
            className="text-destructive text-xs font-medium"
            data-testid="date-range-error"
          >
            시작일({startDate})이 종료일({endDate})보다 늦을 수 없습니다. 기간을
            다시 선택해 주세요.
          </p>
        )}
      </div>

      {/* TanStack Table + shadcn/ui Table */}
      <div className="bg-background w-full min-w-0 overflow-hidden rounded-xl border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const meta = header.column.columnDef.meta as
                    ResponsiveColumnMeta | undefined;
                  return (
                    <TableHead key={header.id} className={cn(meta?.className)}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => {
                    const meta = cell.column.columnDef.meta as
                      ResponsiveColumnMeta | undefined;
                    return (
                      <TableCell key={cell.id} className={cn(meta?.className)}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center whitespace-normal"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <p className="text-muted-foreground text-sm">
                      검색어 또는 지정한 기간에 일치하는 자산 데이터가 없습니다.
                    </p>
                    {isFiltered && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={resetFilters}
                      >
                        필터 초기화
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col items-center justify-between gap-3 px-1 sm:flex-row">
        <div className="text-muted-foreground text-xs">
          선택된 자산:{" "}
          <strong className="text-foreground">
            {table.getFilteredSelectedRowModel().rows.length}
          </strong>
          건 / 조회된 자산{" "}
          <strong className="text-foreground">
            {table.getFilteredRowModel().rows.length}
          </strong>
          건
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-xs">
              페이지당 행 수
            </span>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => table.setPageSize(Number(value))}
            >
              <SelectTrigger className="h-8 w-[72px] text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent side="top">
                {[5, 10, 20].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}개
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="text-xs font-medium">
            페이지 {table.getState().pagination.pageIndex + 1} /{" "}
            {Math.max(1, table.getPageCount())}
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              aria-label="첫 페이지"
            >
              <ChevronsLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              aria-label="이전 페이지"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              aria-label="다음 페이지"
            >
              <ChevronRight className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              aria-label="마지막 페이지"
            >
              <ChevronsRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
