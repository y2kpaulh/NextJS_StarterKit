import Link from "next/link";
import {
  ArrowRight,
  Blocks,
  CheckCircle2,
  Code2,
  FlaskConical,
  Layers,
  LayoutDashboard,
  Lock,
  Palette,
  ShieldCheck,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const FEATURES = [
  {
    icon: Zap,
    title: "Next.js v15 App Router",
    description:
      "React 19와 서버 컴포넌트(RSC) 아키텍처를 기반으로 마케팅, 인증, 대시보드 라우트 그룹이 사전 구성되어 있습니다.",
    badge: "v15.3+",
  },
  {
    icon: Palette,
    title: "Tailwind CSS v4 (Zero-Config)",
    description:
      "tailwind.config 파일 없이 globals.css의 @theme inline과 OKLCH 시맨틱 컬러 토큰으로 라이트/다크 모드를 완벽 지원합니다.",
    badge: "CSS-First",
  },
  {
    icon: Blocks,
    title: "shadcn/ui & Lucide Icons",
    description:
      "실무에 즉시 투입 가능한 20종의 핵심 UI 프리미티브(Form, Dialog, Sheet, Table, Tabs, Sonner 등)가 내장되어 있습니다.",
    badge: "20+ UI",
  },
  {
    icon: FlaskConical,
    title: "Harness-Driven Development",
    description:
      "4-State UI 샌드박스 하네스(Normal/Loading/Empty/Error)와 Vitest 기반 renderWithHarness로 모든 기능을 격리 검증합니다.",
    badge: "Harness",
  },
  {
    icon: ShieldCheck,
    title: "React Hook Form + Zod",
    description:
      "스키마 우선(Schema-First) 설계로 정적 TypeScript 타입 추론과 런타임 폼 유효성 검사를 단일 소스로 관리합니다.",
    badge: "Type-Safe",
  },
  {
    icon: Layers,
    title: "Zustand 전역 상태 스토어",
    description:
      "보일러플레이트 없이 로컬 스토리지 영속성(persist)을 지원하는 경량 전역 상태 관리 스토어가 준비되어 있습니다.",
    badge: "State",
  },
];

const HARNESS_STEPS = [
  {
    step: "01",
    title: "Schema & Contract First",
    description:
      "Zod 스키마와 TypeScript 타입을 먼저 정의하여 데이터 계약을 확정합니다.",
    code: "src/lib/validations/auth.ts",
  },
  {
    step: "02",
    title: "4-State UI Sandbox Harness",
    description:
      "Normal, Loading, Empty, Error 4가지 상태를 StateHarness로 실시간 전환하며 검증합니다.",
    code: "src/components/harness/state-harness.tsx",
  },
  {
    step: "03",
    title: "Automated Test Harness",
    description:
      "renderWithHarness()를 통해 Provider 컨텍스트가 주입된 격리 환경에서 단위/통합 테스트를 실행합니다.",
    code: "src/test/harness.tsx",
  },
  {
    step: "04",
    title: "Deterministic Verify Gate",
    description:
      "단일 명령어(npm run verify)로 타입체크, 린트, 포맷, 테스트, 빌드를 한 번에 통과시킵니다.",
    code: "npm run verify",
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Badge
              variant="secondary"
              className="mb-6 gap-1.5 px-3 py-1 text-xs font-medium"
            >
              <Sparkles className="text-primary size-3.5" />
              Next.js 15 • Tailwind CSS v4 • shadcn/ui • Harness Engineering
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              웹 개발을 가장 빠르고 견고하게 시작하는{" "}
              <span className="from-foreground to-muted-foreground bg-gradient-to-r bg-clip-text text-transparent">
                하네스 스타터 킷
              </span>
            </h1>

            <p className="text-muted-foreground mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
              설정 파일 없는 순수 CSS-first <strong>Tailwind CSS v4</strong>,{" "}
              <strong>Next.js v15 App Router</strong>,{" "}
              <strong>shadcn/ui</strong>, 그리고{" "}
              <strong>하네스(Harness) 기반 개발·검증 파이프라인</strong>이 모두
              준비되어 있습니다.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" asChild>
                <Link href="/dashboard">
                  <LayoutDashboard className="size-4" />
                  대시보드 템플릿 보기
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/components">
                  <FlaskConical className="size-4" />
                  컴포넌트 & 하네스 쇼케이스
                </Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/login">
                  <Lock className="size-4" />
                  인증 폼 데모
                </Link>
              </Button>
            </div>

            {/* Quick Start Command Card */}
            <div className="bg-card mt-12 w-full max-w-xl rounded-xl border p-4 text-left shadow-sm">
              <div className="text-muted-foreground mb-2 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-mono">
                  <Terminal className="size-3.5" />
                  Quick Start & Harness Verification
                </span>
                <Badge variant="outline" className="font-mono text-[10px]">
                  zsh / bash
                </Badge>
              </div>
              <pre className="bg-muted/60 overflow-x-auto rounded-lg p-3 font-mono text-xs leading-relaxed sm:text-sm">
                <code>{`npm run dev      # 로컬 개발 서버 실행 (http://localhost:3000)
npm run verify   # 하네스 통합 검증 (Type + Lint + Test + Build)`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack & Features Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-3">
              Production-Ready Stack
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              반복적인 초기 세팅 없이 핵심 기능에만 집중하세요
            </h2>
            <p className="text-muted-foreground mt-3 text-base">
              모던 웹 애플리케이션에 필수적인 아키텍처와 라이브러리가 모범
              사례(Best Practice)로 통합되어 있습니다.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="transition-shadow hover:shadow-md"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-lg">
                        <Icon className="size-5" />
                      </div>
                      <Badge variant="secondary" className="font-mono text-xs">
                        {feature.badge}
                      </Badge>
                    </div>
                    <CardTitle className="mt-3 text-lg">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Harness Engineering Workflow Section */}
      <section className="bg-muted/30 border-y py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="default" className="mb-3 gap-1.5">
              <Code2 className="size-3.5" />
              Harness-Driven Engineering
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              모든 개발은 4단계 하네스 루프로 검증됩니다
            </h2>
            <p className="text-muted-foreground mt-3 text-base">
              <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-xs">
                AGENTS.md
              </code>{" "}
              및{" "}
              <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-xs">
                .agents/rules/harness.md
              </code>{" "}
              규칙을 통해 AI 에이전트와 개발자 모두가 동일한 품질 게이트를
              따릅니다.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {HARNESS_STEPS.map((item) => (
              <Card key={item.step} className="relative overflow-hidden">
                <CardHeader>
                  <span className="text-muted-foreground/40 font-mono text-3xl font-bold">
                    {item.step}
                  </span>
                  <CardTitle className="mt-2 text-base">{item.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/70 text-muted-foreground flex items-center gap-1.5 rounded-md px-2.5 py-1.5 font-mono text-xs">
                    <CheckCircle2 className="text-primary size-3.5 shrink-0" />
                    <span className="truncate">{item.code}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            지금 바로 프리뷰 페이지들을 탐색해 보세요
          </h2>
          <p className="text-muted-foreground mt-3 text-base">
            컴포넌트 하네스 워크벤치, 반응형 대시보드, 인증 폼 템플릿이 모두
            연결되어 있습니다.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button size="lg" asChild>
              <Link href="/components">
                컴포넌트 & 하네스 열기
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/register">회원가입 템플릿 체험</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
