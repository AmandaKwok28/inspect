/**
 * This file contains the default Tailwind mappings used to
 * convert computed CSS properties into utility classes.
 */

export const SPACING_UNIT = 4;

export const FONT_SIZES: Record<string, string> = {
  "12px": "text-xs",
  "14px": "text-sm",
  "16px": "text-base",
  "18px": "text-lg",
  "20px": "text-xl",
  "24px": "text-2xl",
  "30px": "text-3xl",
  "36px": "text-4xl",
  "48px": "text-5xl",
  "60px": "text-6xl",
};

export const FONT_WEIGHTS: Record<string, string> = {
  "100": "font-thin",
  "200": "font-extralight",
  "300": "font-light",
  "400": "font-normal",
  "500": "font-medium",
  "600": "font-semibold",
  "700": "font-bold",
  "800": "font-extrabold",
  "900": "font-black",
};

export const COLORS: Record<string, string> = {
  "rgb(0, 0, 0)": "black",
  "rgb(255, 255, 255)": "white",
  "rgba(0, 0, 0, 0)": "transparent",
};

export const TEXT_ALIGNMENTS = ["left", "center", "right", "justify"];

export const DISPLAY_TYPES = ["flex", "grid", "inline-flex", "inline-grid"];
