import { Avatar } from "@/components/Avatar";
import { Row } from "@/components/Row";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Patient } from "../types/patient.types";
import { CalendarDays, Hourglass, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { PatientStatusConfig } from "../config/patient-status.config";
import { Actions } from "./Actions";

export const PatientRow: React.FC<{ patient: Patient }> = ({ patient }) => {
  if (!patient) return;
  const { firstName, lastName, age, gender, phone, lastVisit, avatar, status } =
    patient;
  const name = firstName + " " + lastName;
  return (
    <Row as="article" className="items-start bg-white">
      <Row.Left>
        <Item>
          <ItemMedia>
            <Avatar src={avatar && undefined} name={name} />
          </ItemMedia>

          <ItemContent>
            <ItemTitle asChild>
              <div>
                <h3>{name}</h3>
                <StatusBadge status={status} config={PatientStatusConfig} />
              </div>
            </ItemTitle>

            <ItemDescription asChild>
              <dl className="space-y-1 ">
                {/* Age & Gender */}
                <div className="flex items-center gap-2">
                  <dt className="sr-only">Age and gender</dt>
                  <dd className="flex items-center gap-2 ">
                    <Hourglass className="w-4 h-4" />
                    <span>
                      Age: {age}, {gender}
                    </span>
                  </dd>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-2">
                  <dt className="sr-only">Phone</dt>
                  <dd className="flex items-center gap-2 ">
                    <Phone className="w-4 h-4" />
                    <Link
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="hover:underline"
                    >
                      {phone}
                    </Link>
                  </dd>
                </div>

                {/* Last Visit */}
                <div className="flex items-center gap-2">
                  <dt className="sr-only">Last visit</dt>
                  <dd className="flex items-center gap-2 ">
                    <CalendarDays className="w-4 h-4" />
                    <time dateTime={lastVisit}>Last: {lastVisit}</time>
                  </dd>
                </div>
              </dl>
            </ItemDescription>
          </ItemContent>
        </Item>
      </Row.Left>
      <Row.Right className="pl-14">
        <Actions id={patient.id} patientName={name} />
      </Row.Right>
    </Row>
  );
};
