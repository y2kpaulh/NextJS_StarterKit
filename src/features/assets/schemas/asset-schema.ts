import { z } from "zod";

export const assetCategorySchema = z.enum([
  "LAPTOP",
  "SERVER",
  "PERIPHERAL",
  "MOBILE",
  "LICENSE",
]);

export type AssetCategory = z.infer<typeof assetCategorySchema>;

export const ASSET_CATEGORY_LABELS: Record<AssetCategory, string> = {
  LAPTOP: "노트북/PC",
  SERVER: "서버/네트워크",
  PERIPHERAL: "모니터/주변기기",
  MOBILE: "모바일/태블릿",
  LICENSE: "소프트웨어/라이선스",
};

export const assetStatusSchema = z.enum([
  "INBOUND",
  "OUTBOUND",
  "MAINTENANCE",
  "DISPOSED",
]);

export type AssetStatus = z.infer<typeof assetStatusSchema>;

export const ASSET_STATUS_LABELS: Record<AssetStatus, string> = {
  INBOUND: "입고 (보관중)",
  OUTBOUND: "출고 (사용중)",
  MAINTENANCE: "점검/수리",
  DISPOSED: "폐기 예정",
};

export const assetTimeframeSchema = z.enum(["day", "week", "month", "year"]);

export type AssetTimeframe = z.infer<typeof assetTimeframeSchema>;

export const ASSET_TIMEFRAME_LABELS: Record<AssetTimeframe, string> = {
  day: "일별 (최근 7일)",
  week: "주별 (최근 8주)",
  month: "월별 (최근 12개월)",
  year: "년별 (최근 5년)",
};

export const assetItemSchema = z.object({
  id: z.string(),
  assetCode: z.string(),
  name: z.string(),
  category: assetCategorySchema,
  status: assetStatusSchema,
  department: z.string(),
  assignee: z.string(),
  location: z.string(),
  quantity: z.number().int().min(1),
  purchasePrice: z.number().int().min(0),
  registeredAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  notes: z.string().optional(),
});

export type AssetItem = z.infer<typeof assetItemSchema>;

export const createAssetSchema = z.object({
  assetCode: z
    .string()
    .min(1, { message: "자산 코드를 입력해 주세요." })
    .regex(/^AST-\d{4}-\d{3,5}$/, {
      message: "자산 코드는 'AST-2026-001' 형식이어야 합니다.",
    }),
  name: z
    .string()
    .min(2, { message: "자산명은 최소 2자 이상 입력해 주세요." })
    .max(80, { message: "자산명은 80자 이하로 입력해 주세요." }),
  category: assetCategorySchema,
  status: assetStatusSchema,
  department: z
    .string()
    .min(2, { message: "담당 부서를 입력해 주세요." })
    .max(40, { message: "부서명은 40자 이하로 입력해 주세요." }),
  assignee: z
    .string()
    .min(2, { message: "담당자 이름을 입력해 주세요." })
    .max(30, { message: "담당자 이름은 30자 이하로 입력해 주세요." }),
  location: z
    .string()
    .min(2, { message: "보관 또는 설치 위치를 입력해 주세요." })
    .max(60, { message: "위치는 60자 이하로 입력해 주세요." }),
  quantity: z.coerce
    .number()
    .int({ message: "수량은 정수여야 합니다." })
    .min(1, { message: "수량은 최소 1개 이상이어야 합니다." })
    .max(1000, { message: "수량은 최대 1,000개까지 등록 가능합니다." }),
  purchasePrice: z.coerce
    .number()
    .int({ message: "취득 가액은 정수여야 합니다." })
    .min(0, { message: "취득 가액은 0원 이상이어야 합니다." }),
  registeredAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "등록일은 YYYY-MM-DD 형식이어야 합니다.",
  }),
  notes: z
    .string()
    .max(200, { message: "비고는 최대 200자까지 입력 가능합니다." })
    .optional(),
});

export type CreateAssetInput = z.infer<typeof createAssetSchema>;

export const assetFilterSchema = z
  .object({
    keyword: z.string().default(""),
    startDate: z.string().default(""),
    endDate: z.string().default(""),
    category: z.union([z.literal("ALL"), assetCategorySchema]).default("ALL"),
    status: z.union([z.literal("ALL"), assetStatusSchema]).default("ALL"),
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return data.startDate <= data.endDate;
      }
      return true;
    },
    {
      message: "시작일은 종료일보다 늦을 수 없습니다.",
      path: ["endDate"],
    },
  );

export type AssetFilterInput = z.infer<typeof assetFilterSchema>;

export interface AssetTrendPoint {
  period: string;
  label: string;
  registered: number;
  inbound: number;
  outbound: number;
}
