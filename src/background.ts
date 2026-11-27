import contentScript from "./content.tsx?script";

/**
 * Notes on Chrome
 *
 * - chrome provides an API, we installed @types/chrome so TS can recognize those APIs
 * - here, we're registering a callback that chrome executes whenever someone clicks on our
 *   extension's toolbar icon
 * - callback: a function that you pass into another function so that the former can be executed
 *             at the appropriate time.
 *
 * - chrome.tabs.sendMessage() sends a message to our content script running in that specific
 *   tab.
 */

// Handles extension activation, retrieves the current tab's zoom,
// and sends a message to toggle inspection mode.
// If the content script isn't loaded, injects it into the tab.
chrome.action.onClicked.addListener(async (tab) => {
  if (tab.id === undefined) return;

  const tabId = tab.id;

  try {
    const zoom = await chrome.tabs.getZoom(tabId);

    const message = {
      type: "TOGGLE_INSPECT",
      zoom,
    };

    try {
      await chrome.tabs.sendMessage(tabId, message);
    } catch {
      await chrome.scripting.executeScript({
        target: { tabId },
        files: [contentScript],
      });

      // The content script activates after initialization.
      // Send the initial zoom when it is ready.
    }
  } catch (error) {
    console.error("Inspect activation failed:", error);
  }
});

// this listens for the content script to finish initializing
// once ready, retrieves the tab's zoom level and sends a message to
// activate inspection mode
chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.type !== "INSPECT_READY") return;
  if (sender.tab?.id === undefined) return;

  const tabId = sender.tab.id;

  void chrome.tabs
    .getZoom(tabId)
    .then((zoom) =>
      chrome.tabs.sendMessage(tabId, {
        type: "TOGGLE_INSPECT",
        zoom,
      }),
    )
    .catch(console.error);
});

// sends message if the zoom changed so we can resize
chrome.tabs.onZoomChange.addListener(({ tabId, newZoomFactor }) => {
  chrome.tabs
    .sendMessage(tabId, {
      type: "ZOOM_CHANGED",
      zoom: newZoomFactor,
    })
    .catch(() => {});
});
