import React from "react";
import { PatientRow } from "./PatientRow";
import { styledList } from "@/lib/utils/layout";
import { Patients } from "../types/patient.types";

export const PatientList: React.FC<{
  patients: Patients;
}> = ({ patients }) => {
  return (
    <ul className={styledList()}>
      {patients.map((patient) => (
        <PatientRow patient={patient} key={patient.id} />
      ))}
    </ul>
  );
};
