import { NextRequest, NextResponse } from "next/server";
import { createAssetRecord, getAssets } from "@/server/db";
import {
  assetFilterSchema,
  createAssetSchema,
} from "@/features/assets/schemas/asset-schema";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const parsedFilters = assetFilterSchema.safeParse({
    keyword: searchParams.get("keyword") ?? "",
    startDate: searchParams.get("startDate") ?? "",
    endDate: searchParams.get("endDate") ?? "",
    category: searchParams.get("category") ?? "ALL",
    status: searchParams.get("status") ?? "ALL",
  });

  if (!parsedFilters.success) {
    return NextResponse.json(
      {
        error: "유효하지 않은 검색 조건입니다.",
        details: parsedFilters.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const result = await getAssets(parsedFilters.data);
  return NextResponse.json(result, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json();
    const parsed = createAssetSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "자산 등록 입력값이 유효하지 않습니다.",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const created = await createAssetRecord(parsed.data);
    return NextResponse.json({ item: created }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "자산 등록 처리 중 오류가 발생했습니다.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
