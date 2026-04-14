import type { RefObject } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeSwitch from "../theme-switch/ThemeSwitch";

type NavbarProps = {
  darkMode: boolean;
  navRef: RefObject<HTMLDivElement | null>;
  stuck: boolean;
  onToggleDarkMode: () => void;
};

const navLinkClassName =
  "hover:text-accent transition-colors duration-300 ease-in-out";

export default function Navbar({
  darkMode,
  navRef,
  stuck,
  onToggleDarkMode,
}: NavbarProps) {
  const location = useLocation();

  const getLinkClassName = (path: string) =>
    `${navLinkClassName} ${location.pathname === path ? "text-accent" : ""}`;

  return (
    <nav
      ref={navRef}
      className={`lg:rounded-2xl ${stuck ? "lg:rounded-tl-none lg:rounded-tr-none" : ""} lg:sticky lg:top-0 w-full bottom-0 flex items-center justify-between left-0 backdrop-blur-md p-4 bg-glass-bg border border-jet text-center lg:h-fit fixed rounded-tl-xl rounded-tr-xl shadow-soft text-sm md:text-base transition-all duration-300 ease-in-out md:px-15 z-1000`}
    >
      <Link to="/" className={getLinkClassName("/")}>
        About
      </Link>
      <Link to="/resume" className={getLinkClassName("/resume")}>
        Resume
      </Link>
      <Link to="/projects" className={getLinkClassName("/projects")}>
        Projects
      </Link>
      <Link to="/contact" className={getLinkClassName("/contact")}>
        Contact
      </Link>

      <ThemeSwitch checked={darkMode} onChange={onToggleDarkMode} />
    </nav>
  );
}
