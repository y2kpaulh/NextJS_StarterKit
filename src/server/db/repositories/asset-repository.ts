import { db, isDatabaseConfigured } from "@/server/db/client";
import {
  DUMMY_ASSETS,
  filterAssets,
  type AssetSearchFilters,
} from "@/features/assets/data/dummy-assets";
import {
  createAssetSchema,
  type AssetItem,
  type CreateAssetInput,
} from "@/features/assets/schemas/asset-schema";

function formatDateOnly(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export async function getAssets(
  filters: AssetSearchFilters = {},
): Promise<{ items: AssetItem[]; source: "database" | "fallback" }> {
  if (!isDatabaseConfigured()) {
    return {
      items: filterAssets(DUMMY_ASSETS, filters),
      source: "fallback",
    };
  }

  try {
    const records = await db.asset.findMany({
      orderBy: { registeredAt: "desc" },
    });

    const mapped: AssetItem[] = records.map((record) => ({
      id: record.id,
      assetCode: record.assetCode,
      name: record.name,
      category: record.category,
      status: record.status,
      department: record.department,
      assignee: record.assignee,
      location: record.location,
      quantity: record.quantity,
      purchasePrice: record.purchasePrice,
      registeredAt: formatDateOnly(record.registeredAt),
      notes: record.notes ?? undefined,
    }));

    return {
      items: filterAssets(mapped, filters),
      source: "database",
    };
  } catch {
    return {
      items: filterAssets(DUMMY_ASSETS, filters),
      source: "fallback",
    };
  }
}

export async function createAssetRecord(
  rawInput: CreateAssetInput,
): Promise<AssetItem> {
  const validated = createAssetSchema.parse(rawInput);

  const created = await db.asset.create({
    data: {
      assetCode: validated.assetCode,
      name: validated.name,
      category: validated.category,
      status: validated.status,
      department: validated.department,
      assignee: validated.assignee,
      location: validated.location,
      quantity: validated.quantity,
      purchasePrice: validated.purchasePrice,
      registeredAt: new Date(`${validated.registeredAt}T00:00:00.000Z`),
      notes: validated.notes ?? null,
    },
  });

  return {
    id: created.id,
    assetCode: created.assetCode,
    name: created.name,
    category: created.category,
    status: created.status,
    department: created.department,
    assignee: created.assignee,
    location: created.location,
    quantity: created.quantity,
    purchasePrice: created.purchasePrice,
    registeredAt: formatDateOnly(created.registeredAt),
    notes: created.notes ?? undefined,
  };
}
