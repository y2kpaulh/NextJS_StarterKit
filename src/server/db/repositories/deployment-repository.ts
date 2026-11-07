import { db, isDatabaseConfigured } from "@/server/db/client";
import {
  createDeploymentSchema,
  type CreateDeploymentInput,
  type DeploymentItem,
} from "@/features/deployments/schemas/deployment-schema";

export const FALLBACK_DEPLOYMENTS: DeploymentItem[] = [
  {
    id: "fallback-904",
    displayId: "DEP-904",
    service: "web-frontend-v15",
    environment: "Production",
    commit: "feat: add 4-state UI harness",
    status: "Success",
    timestamp: "방금 전",
    authorName: "홍길동",
  },
  {
    id: "fallback-903",
    displayId: "DEP-903",
    service: "auth-validation-worker",
    environment: "Staging",
    commit: "refactor: zod schema contract",
    status: "Success",
    timestamp: "15분 전",
    authorName: "홍길동",
  },
  {
    id: "fallback-902",
    displayId: "DEP-902",
    service: "design-tokens-v4",
    environment: "Production",
    commit: "style: oklch dark theme variables",
    status: "Success",
    timestamp: "1시간 전",
    authorName: "홍길동",
  },
  {
    id: "fallback-901",
    displayId: "DEP-901",
    service: "analytics-pipeline",
    environment: "Preview",
    commit: "test: add renderWithHarness suite",
    status: "Review",
    timestamp: "3시간 전",
    authorName: "홍길동",
  },
];

export function formatRelativeTime(date: Date, now: Date = new Date()): string {
  const diffSeconds = Math.max(
    0,
    Math.floor((now.getTime() - date.getTime()) / 1000),
  );
  if (diffSeconds < 60) return "방금 전";
  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) return `${diffMinutes}분 전`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}시간 전`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}일 전`;
}

/**
 * 최근 배포 내역을 PostgreSQL(Prisma)에서 조회하며,
 * 로컬 DB 미설정 또는 연결 실패 시 스타터 킷 샌드박스 폴백 데이터를 반환합니다.
 */
export async function getRecentDeployments(
  limit = 10,
): Promise<{ items: DeploymentItem[]; source: "database" | "fallback" }> {
  if (!isDatabaseConfigured()) {
    return {
      items: FALLBACK_DEPLOYMENTS.slice(0, limit),
      source: "fallback",
    };
  }

  try {
    const records = await db.deployment.findMany({
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: { name: true },
        },
      },
    });

    const items: DeploymentItem[] = records.map((record) => ({
      id: record.id,
      displayId: record.displayId,
      service: record.service,
      environment: record.environment,
      commit: record.commit,
      status: record.status,
      timestamp: formatRelativeTime(record.createdAt),
      authorName: record.author?.name ?? null,
    }));

    return { items, source: "database" };
  } catch {
    return {
      items: FALLBACK_DEPLOYMENTS.slice(0, limit),
      source: "fallback",
    };
  }
}

/**
 * Zod 스키마 계약을 먼저 검증한 후 새 배포 레코드를 생성합니다.
 */
export async function createDeploymentRecord(
  rawInput: CreateDeploymentInput,
): Promise<DeploymentItem> {
  const validated = createDeploymentSchema.parse(rawInput);

  const created = await db.deployment.create({
    data: {
      displayId: validated.displayId,
      service: validated.service,
      environment: validated.environment,
      commit: validated.commit,
      status: validated.status,
      ...(validated.authorEmail
        ? {
            author: {
              connect: { email: validated.authorEmail },
            },
          }
        : {}),
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return {
    id: created.id,
    displayId: created.displayId,
    service: created.service,
    environment: created.environment,
    commit: created.commit,
    status: created.status,
    timestamp: formatRelativeTime(created.createdAt),
    authorName: created.author?.name ?? null,
  };
}
