/**
 * This file is responsible for converting typography-related
 * CSS properties into Tailwind utility classes.
 */

import {
  FONT_SIZES,
  FONT_WEIGHTS,
  TEXT_ALIGNMENTS,
} from "../../constants/tailwind";

import { getColor, getSpacing } from "./utils";

/**
 * Determines the general font family from the computed
 * CSS font-family declaration.
 */
function getFontFamily(value: string): string {
  const family = value.toLowerCase();

  if (family.includes("mono") || family.includes("courier")) {
    return "font-mono";
  }

  if (family.includes("sans-serif")) {
    return "font-sans";
  }

  if (family.includes("serif")) {
    return "font-serif";
  }

  const primaryFont = value.split(",")[0].trim().replaceAll(" ", "_");

  return `font-[${primaryFont}]`;
}

/**
 * Converts an element's computed typography properties
 * into Tailwind utility classes.
 */
export function getTypographyClasses(styles: CSSStyleDeclaration): string[] {
  const classes: string[] = [];

  classes.push(FONT_SIZES[styles.fontSize] ?? `text-[${styles.fontSize}]`);

  classes.push(getFontFamily(styles.fontFamily));

  classes.push(
    FONT_WEIGHTS[styles.fontWeight] ?? `font-[${styles.fontWeight}]`,
  );

  classes.push(getColor("text", styles.color));

  if (TEXT_ALIGNMENTS.includes(styles.textAlign)) {
    classes.push(`text-${styles.textAlign}`);
  }

  if (styles.lineHeight !== "normal") {
    classes.push(getSpacing("leading", styles.lineHeight));
  }

  if (styles.fontStyle === "italic") {
    classes.push("italic");
  }

  return classes;
}
