"use client";

import { Patient, Chat } from "../types";
import { PatientListItem } from "./PatientListItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users } from "lucide-react";

interface PatientListProps {
  patients: Patient[];
  chats: Chat[];
  onOpenChat: (patient: Patient) => void;
}

export function PatientList({ patients, chats, onOpenChat }: PatientListProps) {
  const chatPatientIds = new Set(chats.map((c) => c.patient.id));

  const online = patients.filter((p) => p.isOnline);
  const offline = patients.filter((p) => !p.isOnline);

  if (patients.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48 gap-3 text-slate-400">
        <Users className="h-10 w-10 opacity-30" />
        <p className="text-sm">No patients found</p>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1 px-2">
      <div className="py-2">
        {online.length > 0 && (
          <>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 px-4 mb-1 mt-2">
              Online — {online.length}
            </p>
            {online.map((patient) => (
              <PatientListItem
                key={patient.id}
                patient={patient}
                hasExistingChat={chatPatientIds.has(patient.id)}
                onClick={() => onOpenChat(patient)}
              />
            ))}
          </>
        )}

        {offline.length > 0 && (
          <>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 px-4 mb-1 mt-4">
              Offline — {offline.length}
            </p>
            {offline.map((patient) => (
              <PatientListItem
                key={patient.id}
                patient={patient}
                hasExistingChat={chatPatientIds.has(patient.id)}
                onClick={() => onOpenChat(patient)}
              />
            ))}
          </>
        )}
      </div>
    </ScrollArea>
  );
}
