"use client";
import { useState, useMemo } from "react";
import { Patient } from "../types";
import { mockPatients } from "../data/mockPatients";

interface UsePatientsReturn {
  patients: Patient[];
  isLoading: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredPatients: Patient[];
  getPatientById: (id: string) => Patient | undefined;
}

export function usePatients(): UsePatientsReturn {
  // TODO: Replace with real API call
  // e.g. const { data: patients, isLoading } = useQuery({ queryKey: ['patients'], queryFn: fetchPatients })
  const [patients] = useState<Patient[]>(mockPatients);
  const [isLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPatients = useMemo(() => {
    if (!searchQuery.trim()) return patients;
    const q = searchQuery.toLowerCase();
    return patients.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.condition?.toLowerCase().includes(q) ||
        p.email?.toLowerCase().includes(q)
    );
  }, [patients, searchQuery]);

  const getPatientById = (id: string) => patients.find((p) => p.id === id);

  return {
    patients,
    isLoading,
    searchQuery,
    setSearchQuery,
    filteredPatients,
    getPatientById,
  };
}
