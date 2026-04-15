import { portfolioData as defaultPortfolioData } from "../data/portfolioData";
import type { PortfolioData } from "../types";

const PORTFOLIO_DATA_KEY = "portfolio-data";
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

export function getStoredPortfolioData(): PortfolioData {
  if (typeof window === "undefined") {
    return defaultPortfolioData;
  }

  const savedData = window.localStorage.getItem(PORTFOLIO_DATA_KEY);

  if (!savedData) {
    window.localStorage.setItem(
      PORTFOLIO_DATA_KEY,
      JSON.stringify(defaultPortfolioData),
    );
    return defaultPortfolioData;
  }

  try {
    return JSON.parse(savedData) as PortfolioData;
  } catch {
    window.localStorage.setItem(
      PORTFOLIO_DATA_KEY,
      JSON.stringify(defaultPortfolioData),
    );
    return defaultPortfolioData;
  }
}

export function setStoredPortfolioData(data: PortfolioData) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(PORTFOLIO_DATA_KEY, JSON.stringify(data));
}
