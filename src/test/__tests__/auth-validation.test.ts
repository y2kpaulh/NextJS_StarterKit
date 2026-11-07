import { describe, expect, it } from "vitest";

import { loginSchema, profileSchema, registerSchema } from "@/features/auth";

describe("Auth & Profile Zod Validation Harness", () => {
  it("validates a correct login payload", () => {
    const result = loginSchema.safeParse({
      email: "developer@example.com",
      password: "Password123!",
      rememberMe: true,
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid email and short password in loginSchema", () => {
    const result = loginSchema.safeParse({
      email: "invalid-email",
      password: "123",
    });
    expect(result.success).toBe(false);
  });

  it("rejects mismatched confirmPassword in registerSchema", () => {
    const result = registerSchema.safeParse({
      name: "홍길동",
      email: "hong@example.com",
      password: "Password123",
      confirmPassword: "DifferentPassword123",
      terms: true,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((issue) => issue.path.join("."));
      expect(paths).toContain("confirmPassword");
    }
  });

  it("validates profileSchema with allowed role enum", () => {
    const result = profileSchema.safeParse({
      username: "홍길동",
      email: "developer@example.com",
      bio: "풀스택 엔지니어",
      role: "developer",
      marketingEmails: false,
      securityEmails: true,
    });
    expect(result.success).toBe(true);
  });
});
