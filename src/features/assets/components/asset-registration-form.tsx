"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CheckCircle2, PackagePlus, Sparkles, Wand2 } from "lucide-react";
import { toast } from "sonner";

import {
  ASSET_CATEGORY_LABELS,
  ASSET_STATUS_LABELS,
  createAssetSchema,
  type AssetCategory,
  type AssetStatus,
  type CreateAssetInput,
} from "@/features/assets/schemas/asset-schema";
import { useAssetStore } from "@/features/assets/store/use-asset-store";
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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const DEPARTMENT_SUGGESTIONS = [
  "플랫폼개발팀",
  "디자인시스템팀",
  "인프라보안팀",
  "데이터엔지니어링팀",
  "프로덕트매니지먼트팀",
  "QA품질보증팀",
];

export function AssetRegistrationForm() {
  const router = useRouter();
  const { assets, addAsset } = useAssetStore();

  const nextCodeNumber = String(assets.length + 1).padStart(3, "0");
  const defaultCode = `AST-2026-${nextCodeNumber}`;

  const form = useForm<CreateAssetInput>({
    resolver: zodResolver(createAssetSchema),
    defaultValues: {
      assetCode: defaultCode,
      name: "",
      category: "LAPTOP",
      status: "INBOUND",
      department: "플랫폼개발팀",
      assignee: "",
      location: "판교 오피스 4층 자산보관실",
      quantity: 1,
      purchasePrice: 2500000,
      registeredAt: "2026-11-07",
      notes: "",
    },
  });

  const watchedValues = form.watch();

  const generateNextAssetCode = () => {
    const randomSuffix = String(Math.floor(100 + Math.random() * 899)).padStart(
      3,
      "0",
    );
    const year = watchedValues.registeredAt?.slice(0, 4) || "2026";
    form.setValue("assetCode", `AST-${year}-${randomSuffix}`, {
      shouldValidate: true,
    });
  };

  function onSubmit(values: CreateAssetInput) {
    const created = addAsset(values);
    toast.success(`자산 [${created.assetCode}] 등록이 완료되었습니다.`, {
      description: `${created.name} (${ASSET_STATUS_LABELS[created.status]}, ${created.quantity}대) 내역이 현황표 및 대시보드 그래프에 반영되었습니다.`,
    });
    router.push("/dashboard/assets");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            data-testid="asset-registration-form"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <PackagePlus className="text-primary size-4" />
                <h3 className="text-base font-semibold">
                  1. 자산 식별 및 분류 정보
                </h3>
              </div>
              <Separator />

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="assetCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>자산 코드</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input
                            placeholder="AST-2026-025"
                            className="font-mono"
                            {...field}
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={generateNextAssetCode}
                          title="자산 코드 자동 채번"
                          aria-label="자산 코드 자동 채번"
                        >
                          <Wand2 className="size-4" />
                        </Button>
                      </div>
                      <FormDescription>
                        형식: AST-연도-일련번호 (예: AST-2026-025)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="registeredAt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>등록 / 입출고 일자</FormLabel>
                      <FormControl>
                        <Input type="date" className="font-mono" {...field} />
                      </FormControl>
                      <FormDescription>
                        기간 검색 및 일·주·월·년 그래프 집계 기준일
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>자산명 (모델명 및 상세 사양)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="예: MacBook Pro 16 M4 Max (64GB/2TB)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>자산 카테고리</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="카테고리 선택" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {(
                            Object.keys(
                              ASSET_CATEGORY_LABELS,
                            ) as AssetCategory[]
                          ).map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {ASSET_CATEGORY_LABELS[cat]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>초기 입출고 상태</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="입출고 상태 선택" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {(
                            Object.keys(ASSET_STATUS_LABELS) as AssetStatus[]
                          ).map((st) => (
                            <SelectItem key={st} value={st}>
                              {ASSET_STATUS_LABELS[st]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <h3 className="text-base font-semibold">
                2. 배정 부서 및 수량 · 취득가액 정보
              </h3>
              <Separator />

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>담당 / 배정 부서</FormLabel>
                      <FormControl>
                        <Input placeholder="예: 플랫폼개발팀" {...field} />
                      </FormControl>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {DEPARTMENT_SUGGESTIONS.map((dept) => (
                          <button
                            key={dept}
                            type="button"
                            onClick={() =>
                              form.setValue("department", dept, {
                                shouldValidate: true,
                              })
                            }
                            className="bg-muted hover:bg-accent text-muted-foreground hover:text-foreground cursor-pointer rounded px-2 py-0.5 text-[11px] transition-colors"
                          >
                            {dept}
                          </button>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="assignee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>담당자 (관리자 또는 실사용자)</FormLabel>
                      <FormControl>
                        <Input placeholder="예: 홍길동" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>보관 또는 설치 위치</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="예: 판교 오피스 4층 A구역 / 가산 IDC 제2전산실"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>수량 (대 / 시트)</FormLabel>
                      <FormControl>
                        <Input type="number" min={1} max={1000} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="purchasePrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>단위당 취득 가액 (원)</FormLabel>
                      <FormControl>
                        <Input type="number" min={0} step={10000} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비고 (선택 사항)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="자산 지급 사유, 시리얼 번호, 보증 만료일 등 특이사항을 기록하세요."
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center justify-end gap-3 border-t pt-4">
              <Button variant="outline" type="button" asChild>
                <Link href="/dashboard/assets">취소</Link>
              </Button>
              <Button type="submit" data-testid="submit-asset-button">
                <CheckCircle2 className="size-4" />
                <span>자산 등록 완료</span>
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <div className="lg:col-span-4">
        <Card className="bg-muted/20 sticky top-24">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="text-primary size-4" />
              등록 예정 자산 미리보기
            </CardTitle>
            <CardDescription>
              입력하신 정보가 자산 대장과 대시보드 차트에 아래와 같이
              기록됩니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="bg-background space-y-2.5 rounded-lg border p-3.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold">
                  {watchedValues.assetCode || "AST-2026-000"}
                </span>
                <Badge variant="secondary">
                  {ASSET_STATUS_LABELS[watchedValues.status ?? "INBOUND"]}
                </Badge>
              </div>
              <p className="font-semibold">
                {watchedValues.name || "자산명을 입력해 주세요"}
              </p>
              <p className="text-muted-foreground text-xs">
                {ASSET_CATEGORY_LABELS[watchedValues.category ?? "LAPTOP"]} ·{" "}
                {watchedValues.department || "부서 미지정"} (
                {watchedValues.assignee || "담당자 미지정"})
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">등록 기준일</span>
                <span className="font-mono font-medium">
                  {watchedValues.registeredAt || "-"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">설치/보관 위치</span>
                <span className="font-medium">
                  {watchedValues.location || "-"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">등록 수량</span>
                <span className="font-mono font-medium">
                  {Number(watchedValues.quantity || 0).toLocaleString()}대
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">총 취득 금액</span>
                <span className="text-primary font-mono font-semibold">
                  ₩
                  {(
                    Number(watchedValues.quantity || 0) *
                    Number(watchedValues.purchasePrice || 0)
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
