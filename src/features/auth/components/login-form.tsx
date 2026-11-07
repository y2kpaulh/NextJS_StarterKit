"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound, Loader2, LogIn } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import {
  loginSchema,
  type LoginInput,
} from "@/features/auth/schemas/auth-schema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  async function onSubmit(values: LoginInput) {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSubmitting(false);

    toast.success("로그인 성공!", {
      description: `${values.email} 계정으로 대시보드에 접속합니다.`,
    });
    router.push("/dashboard");
  }

  function fillDemoCredentials() {
    form.setValue("email", "developer@example.com", { shouldValidate: true });
    form.setValue("password", "StarterKit123!", { shouldValidate: true });
  }

  return (
    <Card className="shadow-md">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">로그인</CardTitle>
        <CardDescription>
          이메일과 비밀번호를 입력하거나 데모 계정 자동 채우기를 눌러보세요.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="name@example.com"
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="8자 이상 비밀번호"
                      autoComplete="current-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">
                    로그인 상태 유지
                  </FormLabel>
                </FormItem>
              )}
            />

            <div className="space-y-2 pt-2">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                <Loader2
                  className={cn(
                    "size-4 animate-spin",
                    !isSubmitting && "hidden",
                  )}
                  aria-hidden="true"
                />
                <LogIn
                  className={cn("size-4", isSubmitting && "hidden")}
                  aria-hidden="true"
                />
                <span>{isSubmitting ? "인증 확인 중..." : "로그인"}</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={fillDemoCredentials}
              >
                <KeyRound className="size-4" />
                <span>데모 계정 자동 입력</span>
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-6 text-sm">
        <span className="text-muted-foreground">계정이 없으신가요?</span>
        <Link
          href="/register"
          className="text-primary ml-1.5 font-medium underline-offset-4 hover:underline"
        >
          회원가입
        </Link>
      </CardFooter>
    </Card>
  );
}
