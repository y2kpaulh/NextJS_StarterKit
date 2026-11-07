export const siteConfig = {
  name: "Next.js v15 Starter Kit",
  description:
    "Next.js v15 App Router, TypeScript, Tailwind CSS v4 (CSS-first), shadcn/ui, lucide-react 기반의 하네스(Harness) 주도 웹 개발 스타터 킷",
  url: "https://example.com",
  mainNav: [
    {
      title: "홈",
      href: "/",
    },
    {
      title: "컴포넌트 & 하네스",
      href: "/components",
    },
    {
      title: "대시보드",
      href: "/dashboard",
    },
    {
      title: "로그인",
      href: "/login",
    },
  ],
  dashboardNav: [
    {
      title: "개요 (Overview)",
      href: "/dashboard",
      icon: "layout-dashboard" as const,
    },
    {
      title: "자산 현황 검색 (Assets)",
      href: "/dashboard/assets",
      icon: "boxes" as const,
    },
    {
      title: "신규 자산 등록 (New Asset)",
      href: "/dashboard/assets/new",
      icon: "package-plus" as const,
    },
    {
      title: "컴포넌트 하네스",
      href: "/components",
      icon: "FlaskConical" as const,
    },
    {
      title: "환경 설정 (Settings)",
      href: "/dashboard/settings",
      icon: "settings" as const,
    },
  ],
};

export type SiteConfig = typeof siteConfig;
