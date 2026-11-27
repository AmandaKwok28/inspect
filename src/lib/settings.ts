export type Theme = "light" | "dark";

export async function getTheme(): Promise<Theme> {
  const result = await chrome.storage.local.get("theme");

  return result.theme === "light" ? "light" : "dark";
}

export async function saveTheme(theme: Theme) {
  await chrome.storage.local.set({ theme });
}
