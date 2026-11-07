"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { profileSchema, type ProfileInput } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export default function DashboardSettingsPage() {
  const [isSaving, setIsSaving] = React.useState(false);

  const form = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: "홍길동",
      email: "developer@example.com",
      bio: "Next.js v15 & Tailwind CSS v4 하네스 아키텍처를 활용하는 풀스택 개발자입니다.",
      role: "developer",
      marketingEmails: false,
      securityEmails: true,
    },
  });

  async function onSubmit(values: ProfileInput) {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setIsSaving(false);

    toast.success("설정이 저장되었습니다", {
      description: `${values.username} (${values.role}) 프로필 변경사항이 반영되었습니다.`,
    });
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          프로필 및 알림 설정
        </h2>
        <p className="text-muted-foreground text-sm">
          계정 기본 정보와 이메일 수신 환경설정을 관리합니다.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>기본 프로필 정보</CardTitle>
          <CardDescription>
            React Hook Form과 Zod(`profileSchema`)로 검증되는 설정 폼입니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>사용자 이름</FormLabel>
                      <FormControl>
                        <Input placeholder="이름 입력" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이메일 주소</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>담당 역할 (Role)</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full sm:w-64">
                          <SelectValue placeholder="역할을 선택하세요" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="developer">
                          Developer (개발자)
                        </SelectItem>
                        <SelectItem value="designer">
                          Product Designer (디자이너)
                        </SelectItem>
                        <SelectItem value="pm">
                          Product Manager (기획자)
                        </SelectItem>
                        <SelectItem value="admin">
                          System Admin (관리자)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      대시보드 내 기본 권한 및 뷰 구성에 활용됩니다.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>자기소개 (Bio)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="간단한 소개를 입력해 주세요 (최대 160자)"
                        className="resize-none"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-semibold">이메일 알림 수신 설정</h3>

                <FormField
                  control={form.control}
                  name="securityEmails"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3.5">
                      <div className="space-y-0.5">
                        <FormLabel>보안 및 배포 알림</FormLabel>
                        <FormDescription className="text-xs">
                          새로운 로그인 감지 및 하네스 빌드 실패 시 즉시 알림을
                          받습니다.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="marketingEmails"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3.5">
                      <div className="space-y-0.5">
                        <FormLabel>제품 업데이트 및 뉴스레터</FormLabel>
                        <FormDescription className="text-xs">
                          신규 컴포넌트 템플릿 및 기능 출시 소식을 받습니다.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      저장 중...
                    </>
                  ) : (
                    <>
                      <Save className="size-4" />
                      변경사항 저장
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
