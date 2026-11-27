/**
 * This hook manages the inspector's theme and synchronizes
 * it with Chrome's local storage.
 */

import { useEffect, useState } from "react";
import { getTheme, saveTheme, type Theme } from "../lib/settings";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");

  // Load the saved theme when the component mounts.
  useEffect(() => {
    let cancelled = false;

    getTheme()
      .then((savedTheme) => {
        if (!cancelled) setTheme(savedTheme);
      })
      .catch(console.error);

    return () => {
      cancelled = true;
    };
  }, []);

  // Synchronize theme changes made in other browser tabs.
  useEffect(() => {
    function handleStorageChange(
      changes: Record<string, chrome.storage.StorageChange>,
      area: string,
    ) {
      if (area !== "local" || !changes.theme) return;

      setTheme(changes.theme.newValue === "light" ? "light" : "dark");
    }

    chrome.storage.onChanged.addListener(handleStorageChange);

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  /**
   * Updates the current theme and persists the preference.
   */
  function changeTheme(nextTheme: Theme) {
    setTheme(nextTheme);
    void saveTheme(nextTheme).catch(console.error);
  }

  return { theme, changeTheme };
}
