/**
 * This file contains reusable functions for converting CSS
 * values into their corresponding Tailwind utilities.
 */

import { COLORS, SPACING_UNIT } from "../../constants/tailwind";

/**
 * Converts a CSS spacing value into a Tailwind utility.
 * Falls back to an arbitrary value if it doesn't match
 * the default Tailwind spacing scale.
 *
 * @param prefix - utility prefix such as p, mt, gap, or leading
 * @param value - computed CSS value
 */
export function getSpacing(prefix: string, value: string): string {
  const pixels = parseFloat(value);

  if (value.endsWith("px") && pixels % SPACING_UNIT === 0) {
    return `${prefix}-${pixels / SPACING_UNIT}`;
  }

  return `${prefix}-[${value}]`;
}

/**
 * Converts a CSS color into a Tailwind utility.
 * Uses an arbitrary color value when no known mapping exists.
 *
 * @param prefix - utility prefix such as text or bg
 * @param value - computed CSS color
 */
export function getColor(prefix: string, value: string): string {
  return COLORS[value]
    ? `${prefix}-${COLORS[value]}`
    : `${prefix}-[${value.replaceAll(" ", "")}]`;
}
