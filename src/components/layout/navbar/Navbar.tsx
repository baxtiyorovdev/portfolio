import type { RefObject } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ThemeSwitch from "../theme-switch/ThemeSwitch";

type NavbarProps = {
  darkMode: boolean;
  navRef: RefObject<HTMLDivElement | null>;
  stuck: boolean;
  onToggleDarkMode: () => void;
};

const navLinkClassName =
  "relative hover:text-accent transition-colors duration-300 ease-in-out";

export default function Navbar({
  darkMode,
  navRef,
  stuck,
  onToggleDarkMode,
}: NavbarProps) {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const links = [
    { path: "/", label: "About" },
    { path: "/resume", label: "Resume" },
    { path: "/projects", label: "Projects" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <motion.nav
      ref={navRef}
      className={`lg:rounded-2xl ${
        stuck ? "lg:rounded-tl-none lg:rounded-tr-none" : ""
      } lg:sticky lg:top-0 w-full bottom-0 flex items-center justify-between left-0 backdrop-blur-md p-4 bg-glass-bg text-center lg:h-fit fixed rounded-tl-xl rounded-tr-xl shadow-soft text-sm md:text-base transition-all duration-300 ease-in-out md:px-15 z-1000`}
    >
      {links.map((link) => (
        <motion.div
          key={link.path}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          <Link
            to={link.path}
            className={`${navLinkClassName} ${
              isActive(link.path) ? "text-accent" : ""
            }`}
          >
            {link.label}
          </Link>

          {isActive(link.path) && (
            <motion.div
              layoutId="activeLink"
              className="absolute left-0 -bottom-1 h-0.5 w-full bg-accent rounded"
            />
          )}
        </motion.div>
      ))}

      {/* Theme switch with subtle animation */}
      <motion.div whileHover={{ rotate: 10 }} whileTap={{ scale: 0.9 }}>
        <ThemeSwitch checked={darkMode} onChange={onToggleDarkMode} />
      </motion.div>
    </motion.nav>
  );
}
