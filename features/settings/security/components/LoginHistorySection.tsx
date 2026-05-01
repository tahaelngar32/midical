"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

import { History } from "lucide-react";
import { loginStatusConfig } from "../config/login-status.config";
import { loginHistory } from "../mock/login-history.mock";
import { LoginEvent } from "../types/login-even.types";

export function LoginHistorySection() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? loginHistory : loginHistory.slice(0, 3);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <History className="h-4 w-4 text-muted-foreground" />
          <CardTitle className="text-base">Login history</CardTitle>
        </div>
        <CardDescription>View your recent login activity</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {visible.map((event: LoginEvent) => {
            const {
              icon: StatusIcon,
              label,
              textClass,
              iconClass,
            } = loginStatusConfig[event.status];

            return (
              <div
                key={event.id}
                className="flex items-center justify-between px-6 py-3"
              >
                <div>
                  <p className="text-sm font-medium">{event.device}</p>
                  <p className="text-xs text-muted-foreground">
                    {event.location} · {event.time}
                  </p>
                </div>
                <div className={cn("flex items-center gap-1.5", textClass)}>
                  <StatusIcon className={cn("h-3.5 w-3.5", iconClass)} />
                  <span className="text-xs font-medium">{label}</span>
                </div>
              </div>
            );
          })}
        </div>

        {loginHistory.length > 3 && (
          <>
            <Separator />
            <div className="px-6 py-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
                onClick={() => setShowAll((v) => !v)}
              >
                {showAll ? "Show less" : "View full history"}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
