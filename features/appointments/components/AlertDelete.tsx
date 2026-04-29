"use client";
import { Trash2, Trash2Icon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useQueryParams from "@/hooks/useQueryParam";

export function AlertDelete({ id }: { id: string }) {
  const { setQueryParams } = useQueryParams();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size={"icon-sm"}
          variant={"outline"}
          aria-label="Delete appointment"
          onClick={() => setQueryParams({ id })}
        >
          <Trash2 className="size-4 text-red-500" aria-hidden />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Appointment?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete Appointment View
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            variant="outline"
            onClick={() => setQueryParams({ id: "" })}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
