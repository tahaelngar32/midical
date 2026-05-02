export const sessionStatusConfig = {
  active: {
    label: "Active",
    badgeClass:
      "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-400",
    dotClass: "bg-blue-500",
  },
  inactive: {
    label: "Inactive",
    badgeClass:
      "border-gray-200 bg-gray-50 text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400",
    dotClass: "bg-gray-400",
  },
} as const;

export type SessionStatus = keyof typeof sessionStatusConfig;
