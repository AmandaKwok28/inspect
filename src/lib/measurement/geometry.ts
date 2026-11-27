/**
 * This file is responsible for calculating the edge-to-edge
 * spacing between two element bounding rectangles.
 */

export type Measurement = {
  start: number;
  end: number;
  position: number;
};

/**
 * Calculates horizontal spacing between two elements.
 * The elements must share some vertical space for a
 * horizontal measurement line to connect their edges.
 *
 * @param selectedRect - bounding rectangle of the locked element
 * @param targetRect - bounding rectangle of the hovered element
 * @returns measurement coordinates, or null if no gap exists
 */
export function getHorizontalMeasurement(
  selectedRect: DOMRect,
  targetRect: DOMRect,
): Measurement | null {
  const overlapTop = Math.max(selectedRect.top, targetRect.top);

  const overlapBottom = Math.min(selectedRect.bottom, targetRect.bottom);

  // No vertical overlap between the two elements.
  if (overlapBottom <= overlapTop) return null;

  // Center the measurement line within the overlapping region.
  const position = (overlapTop + overlapBottom) / 2;

  // Target is to the right of the selected element.
  if (targetRect.left > selectedRect.right) {
    return {
      start: selectedRect.right,
      end: targetRect.left,
      position,
    };
  }

  // Target is to the left of the selected element.
  if (targetRect.right < selectedRect.left) {
    return {
      start: targetRect.right,
      end: selectedRect.left,
      position,
    };
  }

  return null;
}

/**
 * Calculates vertical spacing between two elements.
 * The elements must share some horizontal space for a
 * vertical measurement line to connect their edges.
 *
 * @param selectedRect - bounding rectangle of the locked element
 * @param targetRect - bounding rectangle of the hovered element
 * @returns measurement coordinates, or null if no gap exists
 */
export function getVerticalMeasurement(
  selectedRect: DOMRect,
  targetRect: DOMRect,
): Measurement | null {
  const overlapLeft = Math.max(selectedRect.left, targetRect.left);

  const overlapRight = Math.min(selectedRect.right, targetRect.right);

  // No horizontal overlap between the two elements.
  if (overlapRight <= overlapLeft) return null;

  // Center the measurement line within the overlapping region.
  const position = (overlapLeft + overlapRight) / 2;

  // Target is below the selected element.
  if (targetRect.top > selectedRect.bottom) {
    return {
      start: selectedRect.bottom,
      end: targetRect.top,
      position,
    };
  }

  // Target is above the selected element.
  if (targetRect.bottom < selectedRect.top) {
    return {
      start: targetRect.bottom,
      end: selectedRect.top,
      position,
    };
  }

  return null;
}
