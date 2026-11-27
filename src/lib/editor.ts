// record the full original stylesheet
const originalStyles = new WeakMap<HTMLElement, string | null>();

/**
 * Validates requested CSS property and applies the modification directly
 * to the element
 *
 * @param element
 * @param property
 * @param value
 * @returns
 */
export function modifyProperty(
  element: HTMLElement,
  property: string,
  value: string,
) {
  if (!CSS.supports(property, value)) return;

  const previous = element.getAttribute("style");
  element.style.setProperty(property, value);

  const updated = element.getAttribute("style");

  if (previous === updated) return;

  // checks if we've saved this element's styles. if not, save it so we can
  // reset if we need to
  if (!originalStyles.has(element)) {
    originalStyles.set(element, previous);
  }
}

export function resetModifications(element: HTMLElement) {
  const original = originalStyles.get(element);

  if (original === undefined) return;

  if (original === null) {
    element.removeAttribute("style");
  } else {
    element.setAttribute("style", original);
  }

  originalStyles.delete(element);
}

export function hasModifications(element: HTMLElement) {
  return originalStyles.has(element);
}
