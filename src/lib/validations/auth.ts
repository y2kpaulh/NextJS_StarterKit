import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "이메일을 입력해 주세요." })
    .email({ message: "올바른 이메일 형식이 아닙니다." }),
  password: z
    .string()
    .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." }),
  rememberMe: z.boolean().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "이름은 최소 2자 이상이어야 합니다." })
      .max(30, { message: "이름은 30자 이하로 입력해 주세요." }),
    email: z
      .string()
      .min(1, { message: "이메일을 입력해 주세요." })
      .email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." })
      .regex(/[A-Za-z]/, { message: "영문자를 최소 1자 이상 포함해야 합니다." })
      .regex(/[0-9]/, { message: "숫자를 최소 1자 이상 포함해야 합니다." }),
    confirmPassword: z
      .string()
      .min(1, { message: "비밀번호 확인을 입력해 주세요." }),
    terms: z.boolean().refine((val) => val === true, {
      message: "이용약관에 동의해 주세요.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;

export const profileSchema = z.object({
  username: z
    .string()
    .min(2, { message: "사용자 이름은 최소 2자 이상이어야 합니다." })
    .max(30, { message: "사용자 이름은 30자 이하로 입력해 주세요." }),
  email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
  bio: z
    .string()
    .max(160, { message: "자기소개는 최대 160자까지 입력 가능합니다." })
    .optional(),
  role: z.enum(["developer", "designer", "pm", "admin"]),
  marketingEmails: z.boolean(),
  securityEmails: z.boolean(),
});

export type ProfileInput = z.infer<typeof profileSchema>;
