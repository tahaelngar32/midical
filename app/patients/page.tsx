import { PatientHeader } from "@/features/patient/components/PatientHeader";
import { PatientList } from "@/features/patient/components/PatientList";
import { PatientSearch } from "@/features/patient/components/PatientSearch";
import { patientsMock } from "@/features/patient/mock/patient.mock";

export default function  page() {
  return (
    <>
      <PatientHeader />
      <PatientSearch />
      <PatientList patients={patientsMock} />
    </>
  );
}
