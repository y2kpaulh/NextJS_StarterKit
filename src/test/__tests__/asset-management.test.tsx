import { describe, expect, it, beforeEach } from "vitest";
import { act, renderWithHarness, screen, fireEvent } from "@/test/harness";
import {
  AssetDataTable,
  AssetTrendChart,
  assetFilterSchema,
  computeAssetTrends,
  createAssetSchema,
  DUMMY_ASSETS,
  filterAssets,
  useAssetStore,
} from "@/features/assets";
import { getAssets } from "@/server/db";

describe("Asset Management Schema, TanStack Table & Trend Chart Harness", () => {
  beforeEach(() => {
    useAssetStore.getState().resetAssets();
  });

  describe("createAssetSchema & assetFilterSchema (Zod Contracts)", () => {
    it("accepts valid asset registration input", () => {
      const parsed = createAssetSchema.safeParse({
        assetCode: "AST-2026-099",
        name: "MacBook Pro 16 M4 Max",
        category: "LAPTOP",
        status: "INBOUND",
        department: "플랫폼개발팀",
        assignee: "홍길동",
        location: "판교 오피스 4층",
        quantity: 2,
        purchasePrice: 4800000,
        registeredAt: "2026-11-07",
        notes: "신규 입사자 장비",
      });

      expect(parsed.success).toBe(true);
    });

    it("rejects invalid assetCode and inverted date range", () => {
      const invalidAsset = createAssetSchema.safeParse({
        assetCode: "WRONG-CODE",
        name: "A",
        category: "LAPTOP",
        status: "INBOUND",
        department: "개발",
        assignee: "홍",
        location: "판교",
        quantity: 0,
        purchasePrice: -100,
        registeredAt: "2026/11/07",
      });
      expect(invalidAsset.success).toBe(false);

      const invalidDateRange = assetFilterSchema.safeParse({
        keyword: "",
        startDate: "2026-11-07",
        endDate: "2026-10-01",
        category: "ALL",
        status: "ALL",
      });
      expect(invalidDateRange.success).toBe(false);
    });
  });

  describe("filterAssets (Keyword & Date Range Search)", () => {
    it("filters dummy assets by keyword across name, assignee, and department", () => {
      const byName = filterAssets(DUMMY_ASSETS, { keyword: "H100 GPU" });
      expect(byName).toHaveLength(1);
      expect(byName[0]?.assetCode).toBe("AST-2026-022");

      const byAssignee = filterAssets(DUMMY_ASSETS, { keyword: "김민수" });
      expect(byAssignee.length).toBeGreaterThanOrEqual(2);
    });

    it("filters dummy assets by date range (startDate ~ endDate)", () => {
      const novFirstWeek = filterAssets(DUMMY_ASSETS, {
        startDate: "2026-11-01",
        endDate: "2026-11-07",
      });

      expect(novFirstWeek.length).toBe(6);
      expect(
        novFirstWeek.every(
          (a) =>
            a.registeredAt >= "2026-11-01" && a.registeredAt <= "2026-11-07",
        ),
      ).toBe(true);
    });
  });

  describe("AssetDataTable UI Harness (Keyword & Date Range Filtering)", () => {
    it("filters table rows via keyword search and date range inputs", async () => {
      const { user } = renderWithHarness(
        <AssetDataTable assets={DUMMY_ASSETS} />,
      );

      expect(screen.getByTestId("filtered-asset-count")).toHaveTextContent(
        `검색 결과 ${DUMMY_ASSETS.length}건 / 전체 ${DUMMY_ASSETS.length}건`,
      );

      const keywordInput = screen.getByTestId("asset-keyword-input");
      await user.type(keywordInput, "H100");

      expect(screen.getByTestId("filtered-asset-count")).toHaveTextContent(
        `검색 결과 1건 / 전체 ${DUMMY_ASSETS.length}건`,
      );
      expect(
        screen.getByText("NVIDIA H100 GPU 추론 서버 노드 #4"),
      ).toBeInTheDocument();

      // Reset filters
      await user.click(screen.getByTestId("reset-filters-button"));
      expect(screen.getByTestId("filtered-asset-count")).toHaveTextContent(
        `검색 결과 ${DUMMY_ASSETS.length}건 / 전체 ${DUMMY_ASSETS.length}건`,
      );

      // Apply Date Range Search
      const startInput = screen.getByTestId("asset-start-date-input");
      const endInput = screen.getByTestId("asset-end-date-input");
      act(() => {
        fireEvent.change(startInput, { target: { value: "2026-11-05" } });
        fireEvent.change(endInput, { target: { value: "2026-11-07" } });
      });

      expect(screen.getByTestId("filtered-asset-count")).toHaveTextContent(
        `검색 결과 3건 / 전체 ${DUMMY_ASSETS.length}건`,
      );
    });
  });

  describe("Asset Repository Fallback", () => {
    it("returns filtered fallback assets when DATABASE_URL is not configured", async () => {
      delete process.env.DATABASE_URL;
      const res = await getAssets({
        keyword: "MacBook",
        startDate: "2026-01-01",
        endDate: "2026-12-31",
      });
      expect(res.source).toBe("fallback");
      expect(res.items.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe("AssetTrendChart UI Harness (Day / Week / Month / Year Graph)", () => {
    it("switches across Day, Week, Month, and Year timeframes and updates totals", async () => {
      const { user } = renderWithHarness(
        <AssetTrendChart assets={DUMMY_ASSETS} defaultTimeframe="month" />,
      );

      // Default is month (12 months)
      expect(screen.getByTestId("trend-total-registered")).toHaveTextContent(
        "2,175건",
      );

      // Switch to Day (일별)
      await user.click(screen.getByTestId("timeframe-day"));
      expect(screen.getByTestId("trend-total-registered")).toHaveTextContent(
        "118건",
      );

      // Switch to Week (주별)
      await user.click(screen.getByTestId("timeframe-week"));
      expect(screen.getByTestId("trend-total-registered")).toHaveTextContent(
        "407건",
      );

      // Switch to Year (년별)
      await user.click(screen.getByTestId("timeframe-year"));
      expect(screen.getByTestId("trend-total-registered")).toHaveTextContent(
        "6,935건",
      );
    });

    it("reflects newly registered assets in store and trend calculation", () => {
      const added = useAssetStore.getState().addAsset({
        assetCode: "AST-2026-105",
        name: "신규 H200 AI 서버",
        category: "SERVER",
        status: "INBOUND",
        department: "인프라보안팀",
        assignee: "박지훈",
        location: "가산 IDC",
        quantity: 5,
        purchasePrice: 55000000,
        registeredAt: "2026-11-07",
        notes: "증설 서버 입고",
      });

      expect(added.assetCode).toBe("AST-2026-105");
      const updatedAssets = useAssetStore.getState().assets;
      expect(updatedAssets).toHaveLength(DUMMY_ASSETS.length + 1);

      const dayTrends = computeAssetTrends(updatedAssets, "day");
      const nov07 = dayTrends.find((d) => d.period === "2026-11-07");
      expect(nov07?.registered).toBe(24 + 5);
      expect(nov07?.inbound).toBe(13 + 5);
    });
  });
});
