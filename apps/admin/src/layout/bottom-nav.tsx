"use client";

import { Link, useLocation } from "@tanstack/react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb";
import { Separator } from "@workspace/ui/components/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@workspace/ui/components/sheet";
import { Icon } from "@workspace/ui/composed/icon";
import { LanguageSwitch } from "@workspace/ui/composed/language-switch";
import { ThemeSwitch } from "@workspace/ui/composed/theme-switch";
import { cn } from "@workspace/ui/lib/utils";
import { Fragment, useMemo, useState } from "react";
import { useGlobalStore } from "@/stores/global";
import { LayoutSwitch } from "./layout-switch";
import { findNavByUrl, type NavItem, useNavs } from "./navs";
import TimezoneSwitch from "./timezone-switch";
import { UserNav } from "./user-nav";

function hasChildren(obj: NavItem): obj is NavItem & { items: NavItem[] } {
  return Array.isArray((obj as any).items) && (obj as any).items.length > 0;
}

export function BottombarLayout({ children }: { children: React.ReactNode }) {
  const navs = useNavs();
  const pathname = useLocation({ select: (l) => l.pathname });
  const { common } = useGlobalStore();
  const { site } = common;
  const [openSheet, setOpenSheet] = useState<NavItem | null>(null);

  const normalize = (p: string) =>
    p.endsWith("/") && p !== "/" ? p.replace(/\/+$/, "") : p;
  const isActive = (url: string) => {
    const path = normalize(pathname);
    const target = normalize(url);
    if (target === "/dashboard") return path === target;
    return path === target || path.startsWith(`${target}/`);
  };
  const isGroupActive = (nav: NavItem) =>
    hasChildren(nav) && nav.items.some((i) => isActive(i.url ?? ""));

  const breadcrumbs = useMemo(() => findNavByUrl(navs, pathname), [navs, pathname]);

  return (
    <div className="flex min-h-svh flex-col">
      {/* ── Top Header (minimal) ── */}
      <header className="sticky top-0 z-50 flex h-14 shrink-0 items-center gap-2 border-b bg-background px-4">
        {/* Logo */}
        <Link className="flex items-center gap-2 shrink-0" to="/">
          <img
            alt="logo"
            className="size-6"
            src={site.site_logo || "/favicon.svg"}
          />
          <span className="hidden font-semibold text-sm sm:block truncate max-w-[120px]">
            {site.site_name}
          </span>
        </Link>

        <Separator className="h-4 mx-1" orientation="vertical" />

        {/* Breadcrumb */}
        <Breadcrumb className="flex-1 min-w-0">
          <BreadcrumbList>
            {breadcrumbs.map((item, idx) => (
              <Fragment key={item?.title}>
                {idx < breadcrumbs.length - 1 && (
                  <>
                    <BreadcrumbItem>
                      <Link className="text-sm text-muted-foreground hover:text-foreground" to={item?.url || "/dashboard"}>
                        {item?.title}
                      </Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </>
                )}
                {idx === breadcrumbs.length - 1 && (
                  <BreadcrumbPage className="text-sm font-medium truncate">
                    {item?.title}
                  </BreadcrumbPage>
                )}
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        {/* Right controls */}
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <LanguageSwitch />
          <TimezoneSwitch />
          <LayoutSwitch />
          <ThemeSwitch />
          <UserNav />
        </div>
      </header>

      {/* ── Page Content ── */}
      <main className="flex-1 overflow-auto p-4 pb-20">{children}</main>

      {/* ── Bottom Navigation Bar ── */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="flex h-16 items-center justify-around px-2">
          {navs.map((nav) => {
            const active = hasChildren(nav)
              ? isGroupActive(nav)
              : "url" in nav && isActive((nav as any).url ?? "");

            if (hasChildren(nav)) {
              return (
                <button
                  className={cn(
                    "flex flex-1 flex-col items-center justify-center gap-1 py-1 text-xs transition-colors",
                    active
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  key={nav.title}
                  onClick={() => setOpenSheet(openSheet?.title === nav.title ? null : nav)}
                  type="button"
                >
                  {"icon" in nav && (nav as any).icon && (
                    <Icon
                      className={cn("size-5", active && "text-primary")}
                      icon={(nav as any).icon}
                    />
                  )}
                  <span className="max-w-[56px] truncate leading-none">
                    {nav.title}
                  </span>
                  {active && (
                    <span className="absolute -top-px left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-primary" />
                  )}
                </button>
              );
            }

            return (
              <Link
                className={cn(
                  "relative flex flex-1 flex-col items-center justify-center gap-1 py-1 text-xs transition-colors",
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
                key={nav.title}
                to={"url" in nav ? (nav as any).url : "/dashboard"}
              >
                {"icon" in nav && (nav as any).icon && (
                  <Icon
                    className={cn("size-5", active && "text-primary")}
                    icon={(nav as any).icon}
                  />
                )}
                <span className="max-w-[56px] truncate leading-none">
                  {nav.title}
                </span>
                {active && (
                  <span className="absolute -top-px left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* ── Sub-menu Sheet (slides up from bottom) ── */}
      <Sheet onOpenChange={(open) => !open && setOpenSheet(null)} open={!!openSheet}>
        <SheetContent className="max-h-[60vh] overflow-y-auto rounded-t-2xl" side="bottom">
          <SheetHeader className="mb-4 text-left">
            <SheetTitle className="flex items-center gap-2 text-base">
              {"icon" in (openSheet ?? {}) && (openSheet as any)?.icon && (
                <Icon className="size-5" icon={(openSheet as any).icon} />
              )}
              {openSheet?.title}
            </SheetTitle>
          </SheetHeader>
          <div className="grid grid-cols-3 gap-2 pb-safe">
            {hasChildren(openSheet as NavItem) &&
              (openSheet as NavItem & { items: NavItem[] }).items.map((item) => (
                <Link
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-xl p-3 text-center text-xs transition-colors",
                    isActive(item.url ?? "")
                      ? "bg-primary/10 text-primary font-medium"
                      : "bg-muted/50 hover:bg-accent hover:text-accent-foreground"
                  )}
                  key={item.title}
                  onClick={() => setOpenSheet(null)}
                  to={item.url ?? "/dashboard"}
                >
                  {item.icon && (
                    <Icon className="size-7" icon={item.icon} />
                  )}
                  <span className="leading-tight">{item.title}</span>
                </Link>
              ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
