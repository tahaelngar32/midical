// QuickActions.tsx
import { Button } from "@/components/ui/button";
import SectionCard from "./SectionCard";

export default function QuickActions() {
  return (
    <SectionCard
      title="Quick Actions"
      subtitle="Access frequently used features"
    >
      <div className="flex flex-col gap-3">
        <Button
          size={"lg"}
          variant="default"
          className="bg-[#4988C4] w-full justify-start px-4 py-6! font-semibold"
        >
          Schedule Appointment
        </Button>
        <Button
          size={"lg"}
          variant="outline"
          className="w-full justify-start px-4 py-6! font-semibold"
        >
          New Prescription
        </Button>{" "}
        <Button
          size={"lg"}
          variant="outline"
          className="w-full justify-start px-4 py-6! font-semibold"
        >
          New Patient{" "}
        </Button>{" "}
        <Button
          size={"lg"}
          variant="outline"
          className="w-full justify-start px-4 py-6! font-semibold"
        >
          Start Video Call
        </Button>
      </div>
    </SectionCard>
  );
}
