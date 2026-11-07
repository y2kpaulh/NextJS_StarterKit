import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { AssetRegistrationForm } from "@/features/assets";
import { StateHarness } from "@/components/harness/state-harness";
import { Button } from "@/components/ui/button";

export default function AssetNewPage() {
  return (
    <div className="mx-auto w-full max-w-5xl min-w-0 space-y-6 sm:space-y-8">
      {/* Top Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="-ml-2 h-7 px-2"
              asChild
            >
              <Link href="/dashboard/assets">
                <ArrowLeft className="size-4" />
                자산 현황 목록으로
              </Link>
            </Button>
          </div>
          <h2 className="text-2xl font-bold tracking-tight">
            신규 자산 및 입출고 등록
          </h2>
          <p className="text-muted-foreground text-sm">
            신규 취득 자산을 입고하거나 부서로 출고 배정합니다. 등록된 데이터는
            대시보드 일·주·월·년 그래프와 현황 테이블에 즉시 반영됩니다.
          </p>
        </div>
      </div>

      <StateHarness
        title="자산 등록 폼 하네스 (Zod + React Hook Form)"
        description="유효성 검증 계약(createAssetSchema)과 4-State UI 샌드박스가 결합된 자산 등록 화면"
      >
        <AssetRegistrationForm />
      </StateHarness>
    </div>
  );
}
