"use client";

import { SparklesIcon } from "lucide-react";

import { CopilotPanel } from "@/components/copilot/copilot-panel";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

/** Global entry point for the persistent AI copilot — available from every authenticated screen. */
export function CopilotTrigger() {
  return (
    <Sheet>
      <Tooltip>
        <TooltipTrigger asChild>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-muted-foreground hover:text-foreground"
              aria-label="Open Conditor Copilot"
            >
              <SparklesIcon />
            </Button>
          </SheetTrigger>
        </TooltipTrigger>
        <TooltipContent side="bottom">Conditor Copilot</TooltipContent>
      </Tooltip>

      <SheetContent className="w-full p-0 sm:max-w-md">
        <SheetHeader className="sr-only">
          <SheetTitle>Conditor Copilot</SheetTitle>
        </SheetHeader>
        <CopilotPanel />
      </SheetContent>
    </Sheet>
  );
}
