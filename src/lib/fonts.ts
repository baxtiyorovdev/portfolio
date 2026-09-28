import { Manrope } from "next/font/google";

// Single typeface used throughout the Bento design (Medium for UI, SemiBold for titles).
export const fontSans = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const fontVariables = fontSans.variable;
