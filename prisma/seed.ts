import { PrismaClient } from "@prisma/client";
import { DUMMY_ASSETS } from "../src/features/assets/data/dummy-assets";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding PostgreSQL database with initial Starter Kit data...");

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@starterkit.dev" },
    update: {
      name: "홍길동",
      username: "gildong-dev",
      bio: "Next.js v15 & Harness Engineering Maintainer",
      role: "admin",
      marketingEmails: false,
      securityEmails: true,
    },
    create: {
      email: "admin@starterkit.dev",
      name: "홍길동",
      username: "gildong-dev",
      bio: "Next.js v15 & Harness Engineering Maintainer",
      role: "admin",
      marketingEmails: false,
      securityEmails: true,
    },
  });

  const seedDeployments = [
    {
      displayId: "DEP-904",
      service: "web-frontend-v15",
      environment: "Production" as const,
      commit: "feat: add 4-state UI harness",
      status: "Success" as const,
      authorId: adminUser.id,
    },
    {
      displayId: "DEP-903",
      service: "auth-validation-worker",
      environment: "Staging" as const,
      commit: "refactor: zod schema contract",
      status: "Success" as const,
      authorId: adminUser.id,
    },
    {
      displayId: "DEP-902",
      service: "design-tokens-v4",
      environment: "Production" as const,
      commit: "style: oklch dark theme variables",
      status: "Success" as const,
      authorId: adminUser.id,
    },
    {
      displayId: "DEP-901",
      service: "analytics-pipeline",
      environment: "Preview" as const,
      commit: "test: add renderWithHarness suite",
      status: "Review" as const,
      authorId: adminUser.id,
    },
  ];

  for (const item of seedDeployments) {
    await prisma.deployment.upsert({
      where: { displayId: item.displayId },
      update: {
        service: item.service,
        environment: item.environment,
        commit: item.commit,
        status: item.status,
        authorId: item.authorId,
      },
      create: item,
    });
  }

  for (const asset of DUMMY_ASSETS) {
    await prisma.asset.upsert({
      where: { assetCode: asset.assetCode },
      update: {
        name: asset.name,
        category: asset.category,
        status: asset.status,
        department: asset.department,
        assignee: asset.assignee,
        location: asset.location,
        quantity: asset.quantity,
        purchasePrice: asset.purchasePrice,
        registeredAt: new Date(`${asset.registeredAt}T00:00:00.000Z`),
        notes: asset.notes ?? null,
      },
      create: {
        assetCode: asset.assetCode,
        name: asset.name,
        category: asset.category,
        status: asset.status,
        department: asset.department,
        assignee: asset.assignee,
        location: asset.location,
        quantity: asset.quantity,
        purchasePrice: asset.purchasePrice,
        registeredAt: new Date(`${asset.registeredAt}T00:00:00.000Z`),
        notes: asset.notes ?? null,
      },
    });
  }

  console.log(
    `Seed completed: 1 user (${adminUser.email}), ${seedDeployments.length} deployments, and ${DUMMY_ASSETS.length} assets.`,
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Failed to seed database:", error);
    await prisma.$disconnect();
    process.exit(1);
  });

