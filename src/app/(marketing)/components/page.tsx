"use client";

import * as React from "react";
import {
  Bell,
  CheckCircle2,
  FlaskConical,
  Layers,
  Minus,
  Plus,
  RotateCcw,
  Sparkles,
  UserCheck,
  Wand2,
} from "lucide-react";
import { toast } from "sonner";

import { useAppStore, type HarnessMode } from "@/store/use-app-store";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StateHarness } from "@/components/harness/state-harness";

const SAMPLE_MEMBERS = [
  {
    id: "1",
    name: "김민수",
    role: "Lead Frontend Engineer",
    status: "Active",
    initials: "민수",
  },
  {
    id: "2",
    name: "이지은",
    role: "Product Designer",
    status: "In Review",
    initials: "지은",
  },
  {
    id: "3",
    name: "박준혁",
    role: "Full-Stack Developer",
    status: "Active",
    initials: "준혁",
  },
];

export default function ComponentsShowcasePage() {
  const {
    counter,
    increment,
    decrement,
    resetCounter,
    defaultHarnessState,
    setDefaultHarnessState,
  } = useAppStore();

  const [sandboxState, setSandboxState] = React.useState<HarnessMode>("normal");

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col justify-between gap-4 border-b pb-8 md:flex-row md:items-end">
        <div>
          <Badge variant="secondary" className="mb-3 gap-1.5">
            <FlaskConical className="text-primary size-3.5" />
            Design System & Interactive Harness
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            컴포넌트 & 하네스 워크벤치
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl text-base">
            Tailwind CSS v4 (CSS-first)로 스타일링된 shadcn/ui 컴포넌트와 4-상태
            UI 샌드박스 하네스, Zustand 스토어, Sonner 토스트를 실시간으로
            검증합니다.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              toast.success("하네스 검증 준비 완료!", {
                description:
                  "모든 UI 프리미티브와 상태 전환기가 정상 작동 중입니다.",
              })
            }
          >
            <Bell className="size-4" />
            테스트 토스트 띄우기
          </Button>
        </div>
      </div>

      <Tabs defaultValue="harness" className="space-y-8">
        <TabsList className="grid w-full max-w-xl grid-cols-3">
          <TabsTrigger value="harness" className="gap-1.5">
            <FlaskConical className="size-4" />
            UI 샌드박스 하네스
          </TabsTrigger>
          <TabsTrigger value="primitives" className="gap-1.5">
            <Wand2 className="size-4" />
            UI 프리미티브
          </TabsTrigger>
          <TabsTrigger value="state" className="gap-1.5">
            <Layers className="size-4" />
            상태 & 피드백
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: 4-State UI Sandbox Harness */}
        <TabsContent value="harness" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-base">
                  4-State UI 하네스 제어판
                </CardTitle>
                <CardDescription>
                  우측 위젯의 상태(Normal / Loading / Empty / Error)를 강제로
                  전환하여 Edge Case UI를 격리 검증합니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>현재 활성 하네스 상태</Label>
                  <Select
                    value={sandboxState}
                    onValueChange={(val) => setSandboxState(val as HarnessMode)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="상태 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">
                        Normal (정상 데이터)
                      </SelectItem>
                      <SelectItem value="loading">
                        Loading (스켈레톤 로딩)
                      </SelectItem>
                      <SelectItem value="empty">Empty (빈 데이터)</SelectItem>
                      <SelectItem value="error">
                        Error (네트워크 오류)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="bg-muted/50 rounded-lg p-3 text-xs leading-relaxed">
                  <p className="font-semibold">하네스 개발 규칙 요약</p>
                  <p className="text-muted-foreground mt-1">
                    모든 데이터 컴포넌트는 백엔드 API가 연결되기 전에도{" "}
                    <code>&lt;StateHarness /&gt;</code>를 통해 4가지 상태가 모두
                    시각적으로 깨지지 않는지 확인해야 합니다.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="lg:col-span-2">
              <StateHarness
                title="팀 멤버 디렉터리 위젯"
                description="4-State 격리 검증 데모"
                state={sandboxState}
                onStateChange={setSandboxState}
                emptyTitle="등록된 팀 멤버가 없습니다"
                emptyDescription="새 팀원을 초대하여 프로젝트 협업을 시작해 보세요."
                errorTitle="팀 목록 조회 실패 (503 Service Unavailable)"
                errorDescription="잠시 후 다시 시도하거나 네트워크 연결 상태를 확인해 주세요."
                onRetry={() =>
                  toast.info("데이터 재요청 완료", {
                    description: "Normal 상태로 복구되었습니다.",
                  })
                }
              >
                <div className="space-y-3">
                  {SAMPLE_MEMBERS.map((member) => (
                    <div
                      key={member.id}
                      className="hover:bg-accent/30 flex items-center justify-between rounded-lg border p-3.5 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="size-10">
                          <AvatarFallback>{member.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{member.name}</p>
                          <p className="text-muted-foreground text-xs">
                            {member.role}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          member.status === "Active" ? "default" : "secondary"
                        }
                      >
                        <UserCheck className="size-3" />
                        {member.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </StateHarness>
            </div>
          </div>
        </TabsContent>

        {/* Tab 2: UI Primitives */}
        <TabsContent value="primitives" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Buttons & Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Buttons & Badges</CardTitle>
                <CardDescription>
                  다양한 변형(Variant)과 크기(Size)를 지원하는 기본 액션 요소
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  <Button variant="default">Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="link">Link</Button>
                </div>
                <Separator />
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="default">Default Badge</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Form Controls & Dialog */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Form Controls & Dialog Modal
                </CardTitle>
                <CardDescription>
                  Input, Switch, Checkbox 및 접근성이 보장된 Radix Dialog 모달
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="demo-input">프로젝트 이름</Label>
                  <Input
                    id="demo-input"
                    placeholder="Next.js v15 Starter Kit"
                  />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <Label htmlFor="demo-switch">자동 배포 활성화</Label>
                    <p className="text-muted-foreground text-xs">
                      main 브랜치 푸시 시 검증 게이트 후 배포합니다.
                    </p>
                  </div>
                  <Switch id="demo-switch" defaultChecked />
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <Checkbox id="demo-check" defaultChecked />
                  <Label htmlFor="demo-check" className="text-sm font-normal">
                    하네스 검증 규칙(npm run verify) 적용 동의
                  </Label>
                </div>
              </CardContent>
              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Sparkles className="size-4" />
                      Dialog 모달 열기
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>하네스 모달 컴포넌트</DialogTitle>
                      <DialogDescription>
                        Radix UI Dialog 프리미티브와 Tailwind CSS v4
                        애니메이션이 결합된 모달입니다.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="bg-muted/50 rounded-lg p-4 text-sm">
                      키보드 포커스 트랩(Focus Trap)과 ESC 닫기, 스크린 리더
                      접근성이 기본 내장되어 있습니다.
                    </div>
                    <DialogFooter>
                      <Button
                        onClick={() =>
                          toast.success("모달 액션이 실행되었습니다.")
                        }
                      >
                        확인
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Tab 3: Global State (Zustand) & Toast Feedback */}
        <TabsContent value="state" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Zustand 전역 상태 스토어 (Persist)
                </CardTitle>
                <CardDescription>
                  페이지를 이동하거나 새로고침해도 유지되는 전역 상태
                  데모입니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted/40 flex items-center justify-between rounded-xl border p-4">
                  <div>
                    <p className="text-muted-foreground text-xs font-medium uppercase">
                      Global Counter
                    </p>
                    <p
                      data-testid="global-counter-value"
                      className="mt-1 font-mono text-3xl font-bold"
                    >
                      {counter}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={decrement}
                      aria-label="감소"
                    >
                      <Minus className="size-4" />
                    </Button>
                    <Button
                      variant="default"
                      size="icon"
                      onClick={increment}
                      aria-label="증가"
                    >
                      <Plus className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={resetCounter}
                      aria-label="초기화"
                    >
                      <RotateCcw className="size-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>전역 기본 하네스 모드 설정</Label>
                  <div className="flex flex-wrap gap-2">
                    {(
                      ["normal", "loading", "empty", "error"] as HarnessMode[]
                    ).map((mode) => (
                      <Button
                        key={mode}
                        size="sm"
                        variant={
                          defaultHarnessState === mode ? "default" : "outline"
                        }
                        onClick={() => setDefaultHarnessState(mode)}
                      >
                        {mode.toUpperCase()}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Sonner 토스트 알림 시스템
                </CardTitle>
                <CardDescription>
                  상황별 사용자 피드백을 즉시 표시하는 테마 연동 토스트
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() =>
                    toast.success("저장이 완료되었습니다", {
                      description: "변경사항이 안전하게 반영되었습니다.",
                    })
                  }
                >
                  <CheckCircle2 className="size-4 text-emerald-500" />
                  Success 토스트
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    toast.error("요청 처리 중 오류 발생", {
                      description: "입력값을 다시 확인해 주세요.",
                    })
                  }
                >
                  Error 토스트
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    toast.info("새로운 업데이트 알림", {
                      description: "Tailwind CSS v4 테마가 적용되었습니다.",
                    })
                  }
                >
                  Info 토스트
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    toast("실행 취소 가능한 작업", {
                      description: "항목이 아카이브로 이동되었습니다.",
                      action: {
                        label: "되돌리기",
                        onClick: () => toast.success("복원되었습니다."),
                      },
                    })
                  }
                >
                  Action 토스트
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
