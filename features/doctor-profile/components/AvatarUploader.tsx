"use client";

import { useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera, Trash2, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { getInitialsName } from "@/lib/utils/getInitialsName";

interface AvatarUploaderProps {
  name: string;
  specialty: string;
  hospital: string;
  avatarUrl: string | null;
  onUpload: (dataUrl: string) => void;
  onRemove: () => void;
  onError: (msg: string) => void;
}



export function AvatarUploader({
  name,
  specialty,
  hospital,
  avatarUrl,
  onUpload,
  onRemove,
  onError,
}: AvatarUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      onError("Please upload a valid image file (JPG, PNG, WebP).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      onError("File too large. Maximum size is 5MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) onUpload(e.target.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    // reset so same file can be re-uploaded
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="flex items-center gap-6">
      {/* Avatar with overlay */}
      <div
        className="relative group cursor-pointer flex-shrink-0"
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        role="button"
        aria-label="Upload profile photo"
      >
        <Avatar
          className={cn(
            "h-24 w-24 ring-4 ring-white shadow-xl transition-all duration-200",
            "group-hover:ring-indigo-200",
          )}
        >
          <AvatarImage src={avatarUrl ?? undefined} alt={name} />
          <AvatarFallback className="bg-gradient-to-br from-[#0f2847] to-[#1a3a5c] text-white text-2xl font-semibold font-serif">
            {getInitialsName(name) || "DR"}
          </AvatarFallback>
        </Avatar>

        {/* Camera overlay */}
        <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Camera className="h-6 w-6 text-white" />
        </div>

        {/* Gold ring */}
        <div className="absolute inset-0 rounded-full ring-2 ring-[#b8965a] opacity-60 pointer-events-none" />
      </div>

      {/* Hidden input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleChange}
      />

      {/* Info & actions */}
      <div className="min-w-0">
        <h4 className="text-[15px] font-semibold text-[#0f2847]">
          {name || "Your Name"}
        </h4>
        <p className="text-sm text-slate-500 mt-0.5">
          {specialty} · {hospital}
        </p>
        <p className="text-xs text-slate-400 mt-2 leading-relaxed">
          Minimum 200×200px · JPG, PNG or WebP · Max 5MB
        </p>
        <div className="flex gap-2 mt-3 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={() => inputRef.current?.click()}
            className="h-8 text-xs font-medium border-slate-200 text-[#0f2847] hover:border-[#0f2847] hover:bg-slate-50 gap-1.5"
          >
            <Upload className="h-3.5 w-3.5" />
            Upload Photo
          </Button>
          {avatarUrl && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRemove}
              className="h-8 text-xs font-medium border-red-100 text-red-600 hover:bg-red-50 hover:border-red-300 gap-1.5"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Remove
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
