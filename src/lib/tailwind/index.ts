/**
 * This file is responsible for collecting an element's
 * computed CSS properties and converting them into
 * Tailwind utility classes.
 */

import { getTypographyClasses } from "./typography";
import { getLayoutClasses } from "./layout";
import { getSpacingClasses } from "./spacing";
import { getAppearanceClasses } from "./appearance";

/**
 * Retrieves an element's computed CSS styles and generates
 * corresponding Tailwind utility classes.
 *
 * @param element - the HTML element being inspected
 * @returns an array of inferred Tailwind utility classes
 */
export function getTailwindClasses(element: HTMLElement): string[] {
  const styles = window.getComputedStyle(element);

  return [
    ...getTypographyClasses(styles),
    ...getLayoutClasses(styles),
    ...getSpacingClasses(styles),
    ...getAppearanceClasses(styles),
  ];
}
