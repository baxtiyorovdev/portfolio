export const siteConfig = {
  name: "Baxtiyorov Shaxriyor",
  role: "Front End Developer",
  title: "Baxtiyorov Shaxriyor — Front End Developer",
  description:
    "Front End Developer crafting responsive, modern web experiences with React, TypeScript and a sharp eye for clean UI, performance and motion.",
  url: "https://baxtiyorov.dev",
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
