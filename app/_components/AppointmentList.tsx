import { Avatar } from "@/components/Avatar";
import SectionCard from "../../components/ui/SectionCard";
import { Row } from "@/components/Row";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { statusConfig } from "@/features/appointments/config/appointment-status.config";
import { AppointmentStatus } from "@/features/appointments/types/appointment.types";
import { AppointmentActions } from "@/features/appointments/components/AppointmentActions";

export const appointments = [
  {
    id: "1",
    name: "Sarah Johnson",
    type: "Consultation",
    time: "9:30 AM",
    status: "upcoming" as AppointmentStatus,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    type: "Consultation",
    time: "10:30 AM",
    status: "in-progress" as AppointmentStatus,
  },
];

export default function AppointmentList() {
  return (
    <SectionCard
      title="Today's Appointments"
      subtitle="Manage your scheduled appointments"
      action={{ label: "View All", href: "/appointments" }}
    >
      <ul className="space-y-3" aria-label="Appointment list">
        {appointments.map((appointment) => (
          <Row as="li" key={appointment.id}>
            <Row.Left>
              <Item>
                <ItemMedia>
                  <Avatar />
                </ItemMedia>

                <ItemContent className="gap-1">
                  <ItemTitle>{appointment.name}</ItemTitle>
                  <ItemDescription className="text-[#4988C4]">
                    {appointment.type}
                  </ItemDescription>
                </ItemContent>
              </Item>
            </Row.Left>

            <Row.Right className="pl-12">
              <AppointmentActions
                id={appointment.id}
                patientName={appointment.name}
                status={appointment.status}
                isVideoType={appointment.type === "Video Consultation"}
                allowedActions={["join-call", "start-call"]}
              />
              <span className="text-xs text-[#1e2129] font-semibold">
                {appointment.time}
              </span>
              <StatusBadge status={appointment.status} config={statusConfig} />
            </Row.Right>
          </Row>
        ))}
      </ul>
    </SectionCard>
  );
}
