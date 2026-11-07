"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FlaskConical,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  Sparkles,
} from "lucide-react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/use-app-store";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "@/components/layout/mode-toggle";

const NAV_ITEMS = [
  {
    title: "대시보드 개요",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "환경 설정",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "컴포넌트 하네스",
    href: "/components",
    icon: FlaskConical,
  },
  {
    title: "랜딩 홈으로",
    href: "/",
    icon: Home,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar } = useAppStore();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className="bg-muted/20 flex min-h-screen">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "bg-sidebar text-sidebar-foreground hidden flex-col border-r transition-all duration-200 md:flex",
          sidebarOpen ? "w-64" : "w-16",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 overflow-hidden font-semibold"
          >
            <div className="bg-primary text-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-lg">
              <Sparkles className="size-4" />
            </div>
            {sidebarOpen && (
              <span className="truncate text-sm tracking-tight">
                {siteConfig.name}
              </span>
            )}
          </Link>
        </div>

        <nav className="flex-1 space-y-1.5 p-3">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.title}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
                  !sidebarOpen && "justify-center px-0",
                )}
              >
                <Icon className="size-4 shrink-0" />
                {sidebarOpen && <span className="truncate">{item.title}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="border-t p-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className={cn(
              "w-full justify-start gap-2",
              !sidebarOpen && "justify-center px-0",
            )}
            aria-label={sidebarOpen ? "사이드바 접기" : "사이드바 펼치기"}
          >
            {sidebarOpen ? (
              <>
                <PanelLeftClose className="size-4" />
                <span>사이드바 접기</span>
              </>
            ) : (
              <PanelLeftOpen className="size-4" />
            )}
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col">
        <header className="bg-background/80 sticky top-0 z-30 flex h-16 items-center justify-between border-b px-4 backdrop-blur-md sm:px-6">
          <div className="flex items-center gap-3">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden"
                  aria-label="사이드바 메뉴 열기"
                >
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <SheetHeader className="text-left">
                  <SheetTitle className="flex items-center gap-2">
                    <Sparkles className="text-primary size-4" />
                    {siteConfig.name}
                  </SheetTitle>
                  <SheetDescription>대시보드 네비게이션</SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col gap-1.5 px-4">
                  {NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                          pathname === item.href
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                        )}
                      >
                        <Icon className="size-4" />
                        {item.title}
                      </Link>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>
            <h1 className="text-base font-semibold sm:text-lg">
              {pathname === "/dashboard/settings"
                ? "계정 및 환경 설정"
                : "워크스페이스 대시보드"}
            </h1>
          </div>

          <div className="flex items-center gap-2.5">
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative size-9 rounded-full p-0"
                  aria-label="사용자 메뉴"
                >
                  <Avatar className="size-8">
                    <AvatarFallback>DEV</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">홍길동 개발자</span>
                    <span className="text-muted-foreground text-xs">
                      developer@example.com
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings">
                    <Settings className="size-4" />
                    환경 설정
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/components">
                    <FlaskConical className="size-4" />
                    컴포넌트 하네스
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/login">
                    <LogOut className="size-4" />
                    로그아웃
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
