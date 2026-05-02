import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { KeyRound } from "lucide-react";

export function PasswordSection() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <KeyRound className="h-4 w-4 text-muted-foreground" />
          <CardTitle className="text-base">Password</CardTitle>
        </div>
        <CardDescription>Last changed 30 days ago</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="outline" size="sm">
          Change password
        </Button>
      </CardContent>
    </Card>
  );
}
