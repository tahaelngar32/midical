"use client";

interface CompletenessRingProps {
  percentage: number;
  missingFields: string[];
}

export function CompletenessRing({ percentage, missingFields }: CompletenessRingProps) {
  const radius = 23;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const color =
    percentage >= 90 ? "#059669" :
    percentage >= 60 ? "#b8965a" :
    "#dc2626";

  return (
    <div className="flex items-center gap-4 bg-gradient-to-r from-[#0f2847] to-[#1a3a5c] rounded-xl p-4 text-white">
      {/* Ring */}
      <div className="relative flex-shrink-0">
        <svg width="56" height="56" viewBox="0 0 56 56" style={{ transform: "rotate(-90deg)" }}>
          <circle
            cx="28" cy="28" r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="5"
          />
          <circle
            cx="28" cy="28" r={radius}
            fill="none"
            stroke={color}
            strokeWidth="5"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.6s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">
          {percentage}%
        </div>
      </div>

      {/* Text */}
      <div>
        <h4 className="text-sm font-semibold">Profile Completeness</h4>
        <p className="text-xs text-white/60 mt-0.5">
          Complete your profile to increase patient trust
        </p>
        {missingFields.length > 0 && (
          <span className="inline-block mt-1.5 text-[10.5px] font-semibold px-2 py-0.5 rounded-full bg-[#b8965a]/20 text-[#d4af7a] border border-[#b8965a]/30">
            Missing: {missingFields.slice(0, 3).join(" · ")}
            {missingFields.length > 3 && ` +${missingFields.length - 3}`}
          </span>
        )}
      </div>
    </div>
  );
}
