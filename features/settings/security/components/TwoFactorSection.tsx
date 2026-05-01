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
import { Loader2, Shield } from "lucide-react";
export function TwoFactorSection() {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEnable = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setEnabled(true);
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-base">
              Two-factor authentication
            </CardTitle>
          </div>
          <Badge
            variant="outline"
            className={cn(
              "text-xs",
              enabled
                ? "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-400"
                : "text-muted-foreground",
            )}
          >
            {enabled ? "Enabled" : "Not enabled"}
          </Badge>
        </div>
        <CardDescription>
          Add an extra layer of security to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!enabled ? (
          <Button
            variant="outline"
            size="sm"
            onClick={handleEnable}
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
            Enable 2FA
          </Button>
        ) : (
          <p className="text-sm text-green-600 dark:text-green-400">
            Authenticator app linked successfully.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
