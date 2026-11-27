/**
 * Entry point for the Inspect content script.
 * Initializes the inspector when injected into a webpage.
 */

import { initializeInspector } from "./lib/inspection";

initializeInspector();
