import Link from "next/link";
import { Sparkles } from "lucide-react";

import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <Sparkles className="size-3.5" />
          </div>
          <span className="text-sm font-semibold">{siteConfig.name}</span>
          <span className="text-muted-foreground text-xs">
            — Built with Next.js 15, Tailwind v4 & shadcn/ui
          </span>
        </div>

        <div className="text-muted-foreground flex flex-wrap items-center gap-6 text-sm">
          <Link
            href="/components"
            className="hover:text-foreground transition-colors"
          >
            컴포넌트 쇼케이스
          </Link>
          <Link
            href="/dashboard"
            className="hover:text-foreground transition-colors"
          >
            대시보드
          </Link>
          <Link
            href="/login"
            className="hover:text-foreground transition-colors"
          >
            인증 템플릿
          </Link>
        </div>
      </div>
    </footer>
  );
}
