const THEME_KEY = "portfolio-theme";

export function getStoredTheme() {
  if (typeof window === "undefined") {
    return true;
  }

  const savedTheme = window.localStorage.getItem(THEME_KEY);

  if (savedTheme === null) {
    window.localStorage.setItem(THEME_KEY, "dark");
    return true;
  }

  return savedTheme === "dark";
}

export function setStoredTheme(isDark: boolean) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
}
