/**
 * This file defines the state of the inspector throughout
 * its lifecycle.
 */

export type InspectionState = {
  isInspecting: boolean;
  isLocked: boolean;

  inspectedElement: HTMLElement | null;
  measurementTarget: HTMLElement | null;

  zoom: number;

  cursor: {
    x: number;
    y: number;
  };
};

/**
 * Creates the initial state of the inspector.
 */
export function createInspectionState(): InspectionState {
  return {
    isInspecting: false,
    isLocked: false,

    inspectedElement: null,
    measurementTarget: null,

    zoom: 1,

    cursor: {
      x: 0,
      y: 0,
    },
  };
}
