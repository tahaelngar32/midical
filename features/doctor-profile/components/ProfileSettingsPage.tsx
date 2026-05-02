"use client";

import { useState, useRef } from "react";
import { useDoctorProfile } from "../hooks/useDoctorProfile";
import { AvatarUploader } from "./AvatarUploader";
import { CompletenessRing } from "./CompletenessRing";
import { SpecializationTags } from "./SpecializationTags";
import { SaveBar } from "./SaveBar";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import { toast } from "sonner";

import {
  User,
  Briefcase,
  Phone,
  Globe,
  Calendar,
  Eye,
  AlertTriangle,
} from "lucide-react";

import { cn } from "@/lib/utils";

// ── Available languages ──────────────────────────────────────────────────────
const LANGUAGES = [
  { label: "English", flag: "🇬🇧" },
  { label: "Arabic", flag: "🇪🇬" },
  { label: "French", flag: "🇫🇷" },
  { label: "German", flag: "🇩🇪" },
  { label: "Spanish", flag: "🇪🇸" },
  { label: "Italian", flag: "🇮🇹" },
  { label: "Turkish", flag: "🇹🇷" },
  { label: "Russian", flag: "🇷🇺" },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// ── Section Card ─────────────────────────────────────────────────────────────
function SectionCard({
  icon: Icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100">
        <div className="h-9 w-9 rounded-xl bg-amber-50 flex items-center justify-center">
          <Icon className="h-4.5 w-4.5 text-[#b8965a]" />
        </div>
        <div>
          <h3 className="text-[14.5px] font-semibold text-[#0f2847]">
            {title}
          </h3>
          <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

// ── Toggle Row ───────────────────────────────────────────────────────────────
function ToggleRow({
  label,
  description,
  checked,
  onCheckedChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-3.5 border-b border-slate-100 last:border-0">
      <div>
        <p className="text-sm font-medium text-[#0f2847]">{label}</p>
        <p className="text-xs text-slate-400 mt-0.5">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export function ProfileSettingsPage() {
  const {
    form,
    isDirty,
    isSaving,
    completeness,
    missingFields,
    updateField,
    updateAvatar,
    addSpecialization,
    removeSpecialization,
    toggleLanguage,
    toggleWorkingDay,
    saveProfile,
    discardChanges,
  } = useDoctorProfile();

  const bioMax = 500;
  const fullName = `Dr. ${form.firstName} ${form.lastName}`.trim();

  const handleSave = async () => {
    if (!form.firstName.trim() || !form.lastName.trim()) {
      toast.error("Required fields missing", {
        description: "First and last name are required.",
      });
      return;
    }

    await saveProfile();

    toast.success("Profile saved!", {
      description: "Your changes have been saved successfully.",
    });
  };

  const handleDiscard = () => {
    discardChanges();

    toast.success("Changes discarded", {
      description: "Your profile has been reset.",
    });
  };

  const handleAvatarError = (msg: string) => {
    toast.error("Upload failed", {
      description: msg,
    });
  };

  return (
    <div className="space-y-6 relative">
      {/* HEADER */}

      {/* BODY */}
      <div className=" space-y-6">
        <CompletenessRing
          percentage={completeness}
          missingFields={missingFields}
        />

        {/* PHOTO */}
        <SectionCard
          icon={User}
          title="Profile Photo"
          subtitle="Your photo appears on your profile and in patient conversations"
        >
          <AvatarUploader
            name={fullName}
            specialty={form.specialty}
            hospital={form.hospital}
            avatarUrl={form.avatarUrl}
            onUpload={(url) => {
              updateAvatar(url);
              toast.success("Photo updated", {
                description: "Save your profile to confirm.",
              });
            }}
            onRemove={() => {
              updateAvatar(null);
              toast.success("Photo removed");
            }}
            onError={handleAvatarError}
          />
        </SectionCard>

        {/* PERSONAL INFO */}
        <SectionCard
          icon={User}
          title="Personal Information"
          subtitle="Your basic information visible to patients"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              value={form.firstName}
              onChange={(e) => updateField("firstName", e.target.value)}
              placeholder="First name"
            />
            <Input
              value={form.lastName}
              onChange={(e) => updateField("lastName", e.target.value)}
              placeholder="Last name"
            />
          </div>
        </SectionCard>

        {/* PROFESSIONAL */}
        <SectionCard
          icon={Briefcase}
          title="Professional Details"
          subtitle="Your specialty, hospital, and credentials"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              value={form.hospital}
              onChange={(e) => updateField("hospital", e.target.value)}
              placeholder="Hospital"
            />
            <Input
              value={form.department}
              onChange={(e) => updateField("department", e.target.value)}
              placeholder="Department"
            />
          </div>
        </SectionCard>

        {/* CONTACT */}
        <SectionCard
          icon={Phone}
          title="Contact"
          subtitle="How patients can reach you"
        >
          <Input
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="Email"
          />
        </SectionCard>

        {/* LANGUAGES */}
        <SectionCard
          icon={Globe}
          title="Languages"
          subtitle="Languages you speak"
        >
          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map((l) => (
              <button
                key={l.label}
                onClick={() => toggleLanguage(l.label)}
                className={cn(
                  "px-3 py-2 rounded-lg border text-sm",
                  form.languages.includes(l.label)
                    ? "bg-black text-white"
                    : "bg-white",
                )}
              >
                {l.flag} {l.label}
              </button>
            ))}
          </div>
        </SectionCard>

        {/* VISIBILITY */}
        <SectionCard
          icon={Eye}
          title="Visibility"
          subtitle="Control profile visibility"
        >
          <ToggleRow
            label="Accepting Patients"
            description="Allow new bookings"
            checked={form.acceptingPatients}
            onCheckedChange={(v) => updateField("acceptingPatients", v)}
          />
        </SectionCard>

        {/* DANGER */}
        <div className="bg-white border border-red-100 rounded-2xl p-6">
          <div className="flex items-center gap-2 text-red-600 font-medium">
            <AlertTriangle size={18} />
            Danger Zone
          </div>

          <Button className="mt-4" variant="destructive">
            Delete Account
          </Button>
        </div>
      </div>

      {/* SAVE BAR */}
      <SaveBar
        isDirty={isDirty}
        isSaving={isSaving}
        onSave={handleSave}
        onDiscard={handleDiscard}
      />
    </div>
  );
}
