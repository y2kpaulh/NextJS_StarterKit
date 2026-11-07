import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * 환경 변수에 DATABASE_URL이 유효하게 설정되어 있는지 확인합니다.
 */
export function isDatabaseConfigured(): boolean {
  const url = process.env.DATABASE_URL;
  return Boolean(
    url &&
    (url.startsWith("postgresql://") ||
      url.startsWith("postgres://") ||
      url.startsWith("prisma+postgres://")),
  );
}

/**
 * Next.js 개발 환경의 HMR(Hot Module Replacement) 시
 * PrismaClient 인스턴스가 중복 생성되어 커넥션 풀이 고갈되는 현상을 방지하는 서버 전용 싱글톤입니다.
 */
export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

export const prisma = db;
