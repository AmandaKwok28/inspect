/**
 * Available tabs within the inspector tooltip.
 */

export const TABS = ["inspect", "modify", "settings"] as const;

export type Tab = (typeof TABS)[number];
