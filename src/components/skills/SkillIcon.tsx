import type { ReactNode } from "react";
import {
  FaCss3Alt,
  FaGitAlt,
  FaHtml5,
  FaJs,
  FaLinux,
  FaNodeJs,
  FaReact,
} from "react-icons/fa";
import { SiNextdotjs, SiRedux, SiTypescript } from "react-icons/si";
import { TbBolt } from "react-icons/tb";

export const skillIcons: Record<string, ReactNode> = {
  HTML: <FaHtml5 />,
  CSS: <FaCss3Alt />,
  JavaScript: <FaJs />,
  TypeScript: <SiTypescript />,
  React: <FaReact />,
  "Next.js": <SiNextdotjs />,
  Redux: <SiRedux />,
  Git: <FaGitAlt />,
  "Node.js": <FaNodeJs />,
  Linux: <FaLinux />,
};

export function SkillIcon({ name }: { name: string }) {
  return <>{skillIcons[name] ?? <TbBolt />}</>;
}
