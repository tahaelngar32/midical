"use client";

import { useState, useCallback, useEffect } from "react";
import { DoctorProfileForm, defaultDoctorProfile } from "../types";

interface UseDoctorProfileReturn {
  form: DoctorProfileForm;
  isDirty: boolean;
  isSaving: boolean;
  completeness: number;        // 0–100
  missingFields: string[];
  updateField: <K extends keyof DoctorProfileForm>(key: K, value: DoctorProfileForm[K]) => void;
  addSpecialization: (tag: string) => void;
  removeSpecialization: (tag: string) => void;
  toggleLanguage: (lang: string) => void;
  toggleWorkingDay: (day: string) => void;
  saveProfile: () => Promise<void>;
  discardChanges: () => void;
  updateAvatar: (dataUrl: string | null) => void;
}

// Which fields count toward completeness and their labels
const COMPLETENESS_FIELDS: { key: keyof DoctorProfileForm; label: string; weight: number }[] = [
  { key: "firstName",        label: "First name",   weight: 10 },
  { key: "lastName",         label: "Last name",    weight: 10 },
  { key: "bio",              label: "Bio",           weight: 15 },
  { key: "avatarUrl",        label: "Photo",         weight: 15 },
  { key: "specialty",        label: "Specialty",     weight: 10 },
  { key: "hospital",         label: "Hospital",      weight: 10 },
  { key: "email",            label: "Email",         weight: 10 },
  { key: "phone",            label: "Phone",         weight: 5  },
  { key: "languages",        label: "Languages",     weight: 10 },
  { key: "specializations",  label: "Services",      weight: 5  },
];

function calcCompleteness(form: DoctorProfileForm) {
  let score = 0;
  const missing: string[] = [];

  COMPLETENESS_FIELDS.forEach(({ key, label, weight }) => {
    const val = form[key];
    const filled =
      val !== null &&
      val !== undefined &&
      val !== "" &&
      !(Array.isArray(val) && val.length === 0);
    if (filled) {
      score += weight;
    } else {
      missing.push(label);
    }
  });

  return { score, missing };
}

export function useDoctorProfile(): UseDoctorProfileReturn {
  // TODO: Replace initial state with API fetch
  // e.g. const { data } = useQuery({ queryKey: ['doctor-profile'], queryFn: fetchMyProfile })
  const [saved, setSaved] = useState<DoctorProfileForm>(defaultDoctorProfile);
  const [form, setForm] = useState<DoctorProfileForm>(defaultDoctorProfile);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Track dirtiness by comparing form vs saved
  useEffect(() => {
    setIsDirty(JSON.stringify(form) !== JSON.stringify(saved));
  }, [form, saved]);

  const updateField = useCallback(
    <K extends keyof DoctorProfileForm>(key: K, value: DoctorProfileForm[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const updateAvatar = useCallback((dataUrl: string | null) => {
    setForm((prev) => ({ ...prev, avatarUrl: dataUrl }));
  }, []);

  const addSpecialization = useCallback((tag: string) => {
    const trimmed = tag.trim();
    if (!trimmed) return;
    setForm((prev) => {
      if (prev.specializations.includes(trimmed)) return prev;
      return { ...prev, specializations: [...prev.specializations, trimmed] };
    });
  }, []);

  const removeSpecialization = useCallback((tag: string) => {
    setForm((prev) => ({
      ...prev,
      specializations: prev.specializations.filter((t) => t !== tag),
    }));
  }, []);

  const toggleLanguage = useCallback((lang: string) => {
    setForm((prev) => {
      const has = prev.languages.includes(lang);
      return {
        ...prev,
        languages: has
          ? prev.languages.filter((l) => l !== lang)
          : [...prev.languages, lang],
      };
    });
  }, []);

  const toggleWorkingDay = useCallback((day: string) => {
    setForm((prev) => {
      const has = prev.workingDays.includes(day);
      return {
        ...prev,
        workingDays: has
          ? prev.workingDays.filter((d) => d !== day)
          : [...prev.workingDays, day],
      };
    });
  }, []);

  const saveProfile = useCallback(async () => {
    setIsSaving(true);
    try {
      // TODO: Replace with real API call
      // await api.patch('/doctor/profile', form)
      await new Promise((res) => setTimeout(res, 900));
      setSaved(form);
      setIsDirty(false);
    } finally {
      setIsSaving(false);
    }
  }, [form]);

  const discardChanges = useCallback(() => {
    setForm(saved);
    setIsDirty(false);
  }, [saved]);

  const { score: completeness, missing: missingFields } = calcCompleteness(form);

  return {
    form,
    isDirty,
    isSaving,
    completeness,
    missingFields,
    updateField,
    addSpecialization,
    removeSpecialization,
    toggleLanguage,
    toggleWorkingDay,
    saveProfile,
    discardChanges,
    updateAvatar,
  };
}
