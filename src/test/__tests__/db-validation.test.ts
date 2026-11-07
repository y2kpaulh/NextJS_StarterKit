import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import {
  createDeploymentSchema,
  deploymentItemSchema,
} from "@/features/deployments";
import {
  FALLBACK_DEPLOYMENTS,
  formatRelativeTime,
  getRecentDeployments,
  isDatabaseConfigured,
} from "@/server/db";

describe("Prisma + PostgreSQL Contract & Repository Harness", () => {
  const originalEnv = process.env.DATABASE_URL;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    if (originalEnv === undefined) {
      delete process.env.DATABASE_URL;
    } else {
      process.env.DATABASE_URL = originalEnv;
    }
  });

  describe("createDeploymentSchema (Zod Contract)", () => {
    it("accepts valid deployment creation payload", () => {
      const result = createDeploymentSchema.safeParse({
        displayId: "DEP-905",
        service: "billing-worker",
        environment: "Production",
        commit: "feat: add prisma postgresql repository",
        status: "Success",
        authorEmail: "admin@starterkit.dev",
      });

      expect(result.success).toBe(true);
    });

    it("rejects invalid displayId format", () => {
      const result = createDeploymentSchema.safeParse({
        displayId: "INVALID-ID",
        service: "billing-worker",
        commit: "feat: test invalid id",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.displayId).toBeDefined();
      }
    });

    it("rejects short service or commit strings", () => {
      const result = createDeploymentSchema.safeParse({
        displayId: "DEP-906",
        service: "a",
        commit: "ab",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.service).toBeDefined();
        expect(errors.commit).toBeDefined();
      }
    });
  });

  describe("FALLBACK_DEPLOYMENTS & formatRelativeTime", () => {
    it("validates all fallback items against deploymentItemSchema", () => {
      for (const item of FALLBACK_DEPLOYMENTS) {
        const parsed = deploymentItemSchema.safeParse(item);
        expect(parsed.success).toBe(true);
      }
    });

    it("formats relative time in Korean accurately", () => {
      const now = new Date("2026-11-07T12:00:00Z");
      expect(formatRelativeTime(new Date("2026-11-07T11:59:40Z"), now)).toBe(
        "방금 전",
      );
      expect(formatRelativeTime(new Date("2026-11-07T11:45:00Z"), now)).toBe(
        "15분 전",
      );
      expect(formatRelativeTime(new Date("2026-11-07T09:00:00Z"), now)).toBe(
        "3시간 전",
      );
      expect(formatRelativeTime(new Date("2026-11-05T12:00:00Z"), now)).toBe(
        "2일 전",
      );
    });
  });

  describe("Database configuration & fallback behavior", () => {
    it("detects when DATABASE_URL is not configured", () => {
      delete process.env.DATABASE_URL;
      expect(isDatabaseConfigured()).toBe(false);
    });

    it("detects valid postgresql:// DATABASE_URL", () => {
      process.env.DATABASE_URL =
        "postgresql://postgres:postgres@localhost:5432/nextjs_starter_kit?schema=public";
      expect(isDatabaseConfigured()).toBe(true);
    });

    it("returns fallback deployments when DATABASE_URL is missing", async () => {
      delete process.env.DATABASE_URL;
      const result = await getRecentDeployments(2);
      expect(result.source).toBe("fallback");
      expect(result.items).toHaveLength(2);
      expect(result.items[0]?.displayId).toBe("DEP-904");
    });
  });
});
