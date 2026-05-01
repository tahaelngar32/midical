"use client";

import { useState, KeyboardEvent, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Paperclip, Send, Smile } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (content: string) => Promise<void>;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = async () => {
    if (!value.trim() || isSending || disabled) return;

    const content = value;
    setValue("");

    setIsSending(true);
    try {
      await onSend(content);
    } finally {
      setIsSending(false);
      textareaRef.current?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const canSend = value.trim().length > 0 && !isSending && !disabled;

  return (
    <div className="px-4 py-3.5 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
      <div className="flex items-end gap-2 bg-slate-50 dark:bg-slate-800 rounded-2xl px-3 py-2 border border-slate-200 dark:border-slate-700 focus-within:border-indigo-300 dark:focus-within:border-indigo-700 focus-within:ring-2 focus-within:ring-indigo-100 dark:focus-within:ring-indigo-950 transition-all">
        {/* Attach */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0 text-slate-400 hover:text-indigo-500 hover:bg-transparent mb-0.5"
          disabled={disabled}
          title="Attach file"
        >
          <Paperclip className="h-4 w-4" />
        </Button>

        {/* Textarea */}
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message… (Enter to send)"
          disabled={disabled || isSending}
          rows={1}
          className={cn(
            "flex-1 resize-none border-0 bg-transparent p-0 text-sm text-slate-800 dark:text-slate-100",
            "focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-slate-400",
            "min-h-[32px] max-h-32 leading-relaxed"
          )}
        />

        {/* Emoji */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0 text-slate-400 hover:text-indigo-500 hover:bg-transparent mb-0.5"
          disabled={disabled}
          title="Emoji"
        >
          <Smile className="h-4 w-4" />
        </Button>

        {/* Send */}
        <Button
          onClick={handleSend}
          disabled={!canSend}
          size="icon"
          className={cn(
            "h-8 w-8 shrink-0 rounded-xl mb-0.5 transition-all",
            canSend
              ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200 dark:shadow-indigo-900"
              : "bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed"
          )}
        >
          <Send className="h-3.5 w-3.5" />
        </Button>
      </div>
      <p className="text-[10px] text-slate-400 text-center mt-1.5">
        Shift + Enter for new line
      </p>
    </div>
  );
}
