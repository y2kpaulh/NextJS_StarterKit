import { NextResponse } from "next/server";
import { db, isDatabaseConfigured } from "@/server/db";

export async function GET() {
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      {
        status: "unconfigured",
        database: "postgresql",
        message:
          "DATABASE_URL 환경 변수가 설정되지 않았습니다. .env.example을 참고하여 .env를 구성해 주세요.",
      },
      { status: 200 },
    );
  }

  const startedAt = Date.now();

  try {
    await db.$queryRaw`SELECT 1`;
    const latencyMs = Date.now() - startedAt;

    return NextResponse.json(
      {
        status: "healthy",
        database: "postgresql",
        latencyMs,
      },
      { status: 200 },
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "PostgreSQL 연결 확인 중 알 수 없는 오류가 발생했습니다.";

    return NextResponse.json(
      {
        status: "unhealthy",
        database: "postgresql",
        error: message,
      },
      { status: 503 },
    );
  }
}
