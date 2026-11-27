import { getTailwindClasses } from "./tailwind";

export type EditableStyles = {
  fontSize: number;
  fontWeight: number;
  lineHeight: number;
  paddingX: number;
  paddingY: number;
  marginX: number;
  marginY: number;
  gap: number;
};

function parseValue(value: string, fallback = 0) {
  const parsed = parseFloat(value);

  return Number.isFinite(parsed) ? parsed : fallback;
}

export function inspectElement(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const styles = window.getComputedStyle(element);

  const fontSize = parseValue(styles.fontSize, 16);

  const editableStyles: EditableStyles = {
    fontSize,
    fontWeight: parseValue(styles.fontWeight, 400),
    lineHeight: parseValue(styles.lineHeight, fontSize * 1.2),
    paddingX: parseValue(styles.paddingInlineStart),
    paddingY: parseValue(styles.paddingBlockStart),
    marginX: parseValue(styles.marginInlineStart),
    marginY: parseValue(styles.marginBlockStart),
    gap: parseValue(styles.columnGap),
  };

  return {
    tag: element.tagName.toLowerCase(),
    width: rect.width,
    height: rect.height,
    classes: getTailwindClasses(element),
    styles: editableStyles,
  };
}
