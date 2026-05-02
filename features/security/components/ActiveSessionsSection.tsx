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
import { deviceConfig } from "../config/device-type.config";
import { sessionStatusConfig } from "../config/session-status.config";
import { sessions as mockSessions } from "../mock/session.mock";
import { Loader2 } from "lucide-react";
import { Session } from "../types/session-type";

export function ActiveSessionsSection() {
  const [sessions, setSessions] = useState<Session[]>(mockSessions);
  const [revoking, setRevoking] = useState<string | null>(null);

  const handleRevoke = async (id: string) => {
    setRevoking(id);
    await new Promise((r) => setTimeout(r, 800));
    setSessions((prev) => prev.filter((s) => s.id !== id));
    setRevoking(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Active sessions</CardTitle>
        <CardDescription>Manage your active login sessions</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {sessions.map((session) => {
            const { icon: DeviceIcon } = deviceConfig[session.type];
            const { label, badgeClass, dotClass } =
              sessionStatusConfig[session.status];

            return (
              <div
                key={session.id}
                className="flex items-center justify-between px-6 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md border bg-muted">
                    <DeviceIcon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{session.device}</p>
                    <p className="text-xs text-muted-foreground">
                      {session.location} · {session.lastActive}
                    </p>
                  </div>
                </div>

                {session.isCurrent ? (
                  <Badge
                    variant="outline"
                    className={cn("text-xs gap-1.5", badgeClass)}
                  >
                    <span
                      className={cn("h-1.5 w-1.5 rounded-full", dotClass)}
                    />
                    {label}
                  </Badge>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => handleRevoke(session.id)}
                    disabled={revoking === session.id}
                  >
                    {revoking === session.id && (
                      <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                    )}
                    Revoke
                  </Button>
                )}
              </div>
            );
          })}

          {sessions.length === 0 && (
            <p className="px-6 py-4 text-sm text-muted-foreground">
              No other active sessions.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
