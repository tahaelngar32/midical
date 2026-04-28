"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { flexRow } from "@/lib/utils/layout";
import { actionsConfig } from "../config/appointment-actions.config";
import { AppointmentActionProps } from "../types/appointment.types";
import { AlertDelete } from "./AlertDelete";

export const AppointmentActions: React.FC<AppointmentActionProps> = ({
  allowedActions,
  ...props
}) => {
  const { patientName, id } = props;

  return (
    <div className={flexRow()} role="group">
      {actionsConfig.map((action) => {
        if (allowedActions && !allowedActions.includes(action.key)) {
          return null;
        }

        if (!action.show(props)) return null;

        const Icon = action.icon;

        return (
          <Button
            key={action.key}
            variant={action.variant || "default"}
            className={`text-xs md:text-sm px-1 md:px-2 ${
              action.className || ""
            }`}
            aria-label={`${action.label} ${patientName}`}
          >
            <Icon className="size-4" />
            {action.label}
          </Button>
        );
      })}

      {/* delete برضو ممكن تتحكم فيه لو حبيت */}
      {!allowedActions || allowedActions.includes("delete") ? (
        <AlertDelete id={id} />
      ) : null}
    </div>
  );
};


export default AppointmentActions;
