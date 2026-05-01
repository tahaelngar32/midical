import { Monitor, Smartphone, Tablet } from "lucide-react";


export const deviceConfig = {
  desktop: {
    icon: Monitor,
    label: "Desktop",
  },
  mobile: {
    icon: Smartphone,
    label: "Mobile",
  },
  tablet: {
    icon: Tablet,
    label: "Tablet",
  },
} as const;

export type DeviceType = keyof typeof deviceConfig;
