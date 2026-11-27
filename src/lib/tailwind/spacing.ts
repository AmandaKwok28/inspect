/**
 * This file is responsible for converting padding and margin
 * properties into Tailwind utility classes.
 */

import { getSpacing } from "./utils";

/**
 * Converts an element's computed padding and margin values
 * into Tailwind utility classes.
 */
export function getSpacingClasses(styles: CSSStyleDeclaration): string[] {
  const classes: string[] = [];

  const spacing = [
    ["pt", styles.paddingTop],
    ["pr", styles.paddingRight],
    ["pb", styles.paddingBottom],
    ["pl", styles.paddingLeft],
    ["mt", styles.marginTop],
    ["mr", styles.marginRight],
    ["mb", styles.marginBottom],
    ["ml", styles.marginLeft],
  ];

  for (const [prefix, value] of spacing) {
    if (value !== "0px") {
      classes.push(getSpacing(prefix, value));
    }
  }

  return classes;
}
