import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/layout/mode-toggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-muted/20 relative flex min-h-screen flex-col justify-between">
      <header className="flex h-16 items-center justify-between px-4 sm:px-8">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/">
            <ArrowLeft className="size-4" />
            홈으로 돌아가기
          </Link>
        </Button>
        <ModeToggle />
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="w-full max-w-md space-y-6">
          <div className="flex flex-col items-center text-center">
            <Link
              href="/"
              className="bg-primary text-primary-foreground mb-3 flex size-10 items-center justify-center rounded-xl shadow-xs"
            >
              <Sparkles className="size-5" />
            </Link>
            <span className="text-muted-foreground text-xs font-medium">
              {siteConfig.name}
            </span>
          </div>
          {children}
        </div>
      </main>

      <footer className="text-muted-foreground py-6 text-center text-xs">
        Schema-First Validation with React Hook Form & Zod
      </footer>
    </div>
  );
}
