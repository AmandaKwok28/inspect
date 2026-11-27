/**
 * This file is responsible for converting layout-related
 * CSS properties into Tailwind utility classes.
 */

import { DISPLAY_TYPES } from "../../constants/tailwind";
import { getSpacing } from "./utils";

/**
 * Converts an element's display type and layout gap
 * into Tailwind utility classes.
 */
export function getLayoutClasses(styles: CSSStyleDeclaration): string[] {
  const classes: string[] = [];

  if (!DISPLAY_TYPES.includes(styles.display)) {
    return classes;
  }

  classes.push(styles.display);

  if (styles.gap !== "normal" && styles.gap !== "0px") {
    classes.push(getSpacing("gap", styles.gap));
  }

  return classes;
}
