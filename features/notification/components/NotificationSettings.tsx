"use client";

import { useForm, Controller } from "react-hook-form";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Switch } from "@/components/ui/switch";
import { ActionButton } from "@/components/ActionButton";
import { styledList } from "@/lib/utils/layout";
import { File } from "lucide-react";
import { notificationSettings } from "../config/notification-settings";
import useToast from "@/hooks/useSuccessToast";

type FormValues = {
  [key: string]: boolean;
};

export default function NotificationSettings() {
  const form = useForm<FormValues>({
    defaultValues: notificationSettings.reduce((acc, item) => {
      acc[item.key] = item.isActive;
      return acc;
    }, {} as FormValues),
  });

  useToast({
    state: form.formState,
    successMessage: "Settings updated successfully",
    errorMessage: "Something went wrong",
  });

  const onSubmit = async (data: FormValues) => {
    try {
      console.log("Submitted data:", data);

      
      await new Promise((res) => setTimeout(res, 800));

 
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <ul className={styledList()}>
        {notificationSettings.map((item) => (
          <li key={item.key} className="w-full">
            <Item>
              {/* LEFT */}
              <ItemContent>
                <ItemTitle asChild>
                  <h3 className="font-semibold text-md">{item.title}</h3>
                </ItemTitle>

                <ItemDescription asChild>
                  <p className="leading-tight">{item.description}</p>
                </ItemDescription>
              </ItemContent>

              {/* RIGHT */}
              <Controller
                control={form.control}
                name={item.key}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </Item>
          </li>
        ))}
      </ul>

      <ActionButton
        type="submit"
        label="Save Changes"
        disabled={!form.formState.isDirty || form.formState.isSubmitting}
        className="flex-row-reverse justify-end gap-2 w-40 mx-4 mb-4"
        icon={<File className="size-4" />}
      />
    </form>
  );
}
