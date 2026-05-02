"use client";

import { Button } from "@/components/ui/button";
import { Save, RotateCcw, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SaveBarProps {
  isDirty: boolean;
  isSaving: boolean;
  onSave: () => void;
  onDiscard: () => void;
}

export function SaveBar({
  isDirty,
  isSaving,
  onSave,
  onDiscard,
}: SaveBarProps) {
  return (
    <div
      className={cn(
        " absolute left-1/2 -translate-x-1/2 w-md sm:w-lg md:w-xl lg:w-2xl xl:w-3xl bottom-0 z-30 border border-slate-200 bg-gray-50 rounded-2xl backdrop-blur-md",
        "mx-2 px-2 sm:px-6 py-3.5 flex items-center justify-between",
        "transition-all duration-300",
        isDirty
          ? "translate-y-0 opacity-100"
          : "translate-y-2 opacity-0 pointer-events-none",
      )}
    >
      <p className="text-xs sm:text-sm text-slate-500">
        <span className="font-semibold text-[#0f2847]">Unsaved changes</span> —
        save or discard before leaving
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onDiscard}
          disabled={isSaving}
          className="h-8 text-xs font-medium border-slate-200 text-slate-600 hover:border-slate-400 gap-1"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Discard
        </Button>
        <Button
          size="sm"
          onClick={onSave}
          disabled={isSaving}
          className="h-8 text-xs font-semibold bg-gradient-to-r from-[#b8965a] to-[#d4af7a] hover:from-[#a07845] hover:to-[#c09a60] text-[#0f2847] border-0 shadow-md shadow-amber-200/50 gap-1"
        >
          {isSaving ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Save className="h-3.5 w-3.5" />
          )}
          {isSaving ? "Saving…" : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
