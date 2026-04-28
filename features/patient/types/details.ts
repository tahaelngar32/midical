export type detailsTabsKeys =
  | "overview"
  | "medical"
  | "appointments"
  | "prescriptions";
export type detailsTab = {
  [key in detailsTabsKeys]: {
    link: string;
    label: string;
  };
};


