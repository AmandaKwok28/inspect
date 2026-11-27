/**
 * This file is responsible for converting visual appearance
 * properties into Tailwind utility classes.
 */

import { getColor } from "./utils";

/**
 * Converts an element's background color and border radius
 * into Tailwind utility classes.
 */
export function getAppearanceClasses(styles: CSSStyleDeclaration): string[] {
  const classes: string[] = [];

  const backgroundColor = styles.backgroundColor;

  if (
    backgroundColor !== "rgba(0, 0, 0, 0)" &&
    backgroundColor !== "transparent"
  ) {
    classes.push(getColor("bg", backgroundColor));
  }

  if (styles.borderRadius !== "0px") {
    const radius = styles.borderRadius.replaceAll(" ", "_");

    classes.push(`rounded-[${radius}]`);
  }

  return classes;
}
