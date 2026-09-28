import type { IconType } from "react-icons";
import {
  SiCss,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiLinux,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiRedux,
  SiTypescript,
} from "react-icons/si";
import { RiCodeSSlashFill } from "react-icons/ri";

type TechMeta = { icon: IconType; href: string };

const TECH: Record<string, TechMeta> = {
  html: { icon: SiHtml5, href: "https://developer.mozilla.org/docs/Web/HTML" },
  css: { icon: SiCss, href: "https://developer.mozilla.org/docs/Web/CSS" },
  javascript: { icon: SiJavascript, href: "https://developer.mozilla.org/docs/Web/JavaScript" },
  typescript: { icon: SiTypescript, href: "https://www.typescriptlang.org" },
  react: { icon: SiReact, href: "https://react.dev" },
  "next.js": { icon: SiNextdotjs, href: "https://nextjs.org" },
  redux: { icon: SiRedux, href: "https://redux.js.org" },
  git: { icon: SiGit, href: "https://git-scm.com" },
  "node.js": { icon: SiNodedotjs, href: "https://nodejs.org" },
  linux: { icon: SiLinux, href: "https://www.kernel.org" },
  prisma: { icon: SiPrisma, href: "https://www.prisma.io" },
  postgresql: { icon: SiPostgresql, href: "https://www.postgresql.org" },
};

/** Icon + official link for a technology name; unknown names get a generic glyph. */
export function getTech(name: string): TechMeta {
  return TECH[name.toLowerCase()] ?? { icon: RiCodeSSlashFill, href: "" };
}
