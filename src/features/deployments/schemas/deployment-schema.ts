import { z } from "zod";

export const deploymentEnvironmentSchema = z.enum([
  "Production",
  "Staging",
  "Preview",
]);

export type DeploymentEnvironmentType = z.infer<
  typeof deploymentEnvironmentSchema
>;

export const deploymentStatusSchema = z.enum(["Success", "Review", "Failed"]);

export type DeploymentStatusType = z.infer<typeof deploymentStatusSchema>;

export const createDeploymentSchema = z.object({
  displayId: z.string().regex(/^DEP-\d{3,6}$/, {
    message: "배포 ID는 'DEP-904'와 같은 형식이어야 합니다.",
  }),
  service: z
    .string()
    .min(2, { message: "서비스 이름은 최소 2자 이상이어야 합니다." })
    .max(60, { message: "서비스 이름은 60자 이하로 입력해 주세요." }),
  environment: deploymentEnvironmentSchema.default("Production"),
  commit: z
    .string()
    .min(3, { message: "커밋 요약은 최소 3자 이상이어야 합니다." })
    .max(120, { message: "커밋 요약은 120자 이하로 입력해 주세요." }),
  status: deploymentStatusSchema.default("Success"),
  authorEmail: z
    .string()
    .email({ message: "올바른 작성자 이메일 형식이 아닙니다." })
    .optional(),
});

export type CreateDeploymentInput = z.infer<typeof createDeploymentSchema>;

export const deploymentItemSchema = z.object({
  id: z.string(),
  displayId: z.string(),
  service: z.string(),
  environment: deploymentEnvironmentSchema,
  commit: z.string(),
  status: deploymentStatusSchema,
  timestamp: z.string(),
  authorName: z.string().nullable().optional(),
});

export type DeploymentItem = z.infer<typeof deploymentItemSchema>;
