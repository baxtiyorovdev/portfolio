/**
 * Site-wide SEO identity. Titles, descriptions, structured data and social
 * cards all read from here, so the name and handle are spelled consistently
 * everywhere search engines look.
 */
export const siteConfig = {
  name: "Baxtiyorov Shaxriyor",
  givenName: "Shaxriyor",
  familyName: "Baxtiyorov",
  /** Username used on GitHub, Telegram and Instagram. */
  handle: "baxtiyorovdev",
  /** Other ways people search for the same person (order, transliteration, Cyrillic). */
  alternateNames: [
    "Shaxriyor Baxtiyorov",
    "baxtiyorovdev",
    "Baxtiyorov Shahriyor",
    "Shakhriyor Bakhtiyorov",
    "Bakhtiyorov Shakhriyor",
    "Бахтиёров Шахриёр",
    "Шахриёр Бахтиёров",
  ],
  role: "Front End Developer",
  title: "Baxtiyorov Shaxriyor (@baxtiyorovdev) — Front End Developer",
  description:
    "Baxtiyorov Shaxriyor (baxtiyorovdev) — Front End Developer from Uzbekistan building fast, responsive web apps with React, Next.js and TypeScript.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://baxtiyorov.dev").replace(/\/$/, ""),
  locale: "en_US",
  ogImage: "/illustrations/avatar-1.png",
} as const;

export type NavItem = { href: string; label: string };

export const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];
