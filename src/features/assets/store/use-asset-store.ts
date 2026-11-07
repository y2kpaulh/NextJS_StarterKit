import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DUMMY_ASSETS } from "@/features/assets/data/dummy-assets";
import {
  createAssetSchema,
  type AssetItem,
  type AssetStatus,
  type CreateAssetInput,
} from "@/features/assets/schemas/asset-schema";

export interface AssetStoreState {
  assets: AssetItem[];
  addAsset: (input: CreateAssetInput) => AssetItem;
  updateAssetStatus: (id: string, status: AssetStatus) => void;
  deleteAsset: (id: string) => void;
  resetAssets: () => void;
}

export const useAssetStore = create<AssetStoreState>()(
  persist(
    (set) => ({
      assets: DUMMY_ASSETS,
      addAsset: (rawInput) => {
        const validated = createAssetSchema.parse(rawInput);
        const newAsset: AssetItem = {
          id: `ast-${Date.now()}`,
          assetCode: validated.assetCode,
          name: validated.name,
          category: validated.category,
          status: validated.status,
          department: validated.department,
          assignee: validated.assignee,
          location: validated.location,
          quantity: validated.quantity,
          purchasePrice: validated.purchasePrice,
          registeredAt: validated.registeredAt,
          notes: validated.notes,
        };

        set((state) => ({
          assets: [newAsset, ...state.assets],
        }));

        return newAsset;
      },
      updateAssetStatus: (id, status) =>
        set((state) => ({
          assets: state.assets.map((item) =>
            item.id === id ? { ...item, status } : item,
          ),
        })),
      deleteAsset: (id) =>
        set((state) => ({
          assets: state.assets.filter((item) => item.id !== id),
        })),
      resetAssets: () => set({ assets: DUMMY_ASSETS }),
    }),
    {
      name: "starter-kit-asset-storage",
    },
  ),
);
