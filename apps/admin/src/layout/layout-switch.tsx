"use client";

import { Button } from "@workspace/ui/components/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import { Icon } from "@workspace/ui/composed/icon";
import { cn } from "@workspace/ui/lib/utils";
import { useTranslation } from "react-i18next";
import { type LayoutMode, useLayoutStore } from "@/stores/layout";

const layouts: {
  mode: LayoutMode;
  icon: string;
  labelKey: string;
  labelFallback: string;
}[] = [
    {
      mode: "sidebar",
      icon: "material-symbols:dock-to-left-outline-rounded",
      labelKey: "layout.sidebar",
      labelFallback: "侧边栏",
    },
    {
      mode: "topbar",
      icon: "material-symbols:dock-to-top-outline-rounded",
      labelKey: "layout.topbar",
      labelFallback: "顶部导航",
    },
    {
      mode: "bottombar",
      icon: "material-symbols:dock-to-bottom-outline-rounded",
      labelKey: "layout.bottombar",
      labelFallback: "底部导航",
    },
  ];

export function LayoutSwitch() {
  const { mode, setMode } = useLayoutStore();
  const { t } = useTranslation("components");

  return (
    <TooltipProvider>
      <div className="flex items-center rounded-full border bg-muted/40 p-0.5 gap-0.5">
        {layouts.map((item) => (
          <Tooltip key={item.mode}>
            <TooltipTrigger asChild>
              <Button
                aria-label={t(item.labelKey, item.labelFallback)}
                className={cn(
                  "h-7 w-7 rounded-full transition-all duration-200",
                  mode === item.mode
                    ? "bg-background text-primary shadow-sm"
                    : "bg-transparent text-muted-foreground hover:text-foreground"
                )}
                onClick={() => setMode(item.mode)}
                size="icon"
                variant="ghost"
              >
                <Icon className="size-4" icon={item.icon} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{t(item.labelKey, item.labelFallback)}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
