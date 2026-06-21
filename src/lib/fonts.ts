import { Sora, Inter, JetBrains_Mono } from "next/font/google";

// Display face — used for headings via --font-sora (mapped to font-display in CSS).
export const fontDisplay = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// Body / UI face.
export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Mono — kickers, labels, code-flavoured detail.
export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jet",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const fontVariables = `${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable}`;
