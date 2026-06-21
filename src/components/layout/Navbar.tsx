"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { navItems } from "@/lib/site";
import { about } from "@/lib/portfolio";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { BrandMark } from "./BrandMark";

function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2.5 rounded-full px-1.5 py-1">
      <BrandMark className="transition-transform duration-300 group-hover:scale-105" />
      <span className="hidden text-sm font-semibold sm:block">
        {about.name.split(" ")[0]}
        <span className="text-accent">.dev</span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5">
        <nav
          className={cn(
            "flex w-full max-w-5xl items-center justify-between gap-3 rounded-full border px-3 py-2 transition-all duration-300",
            scrolled ? "glass border-border shadow-card" : "border-transparent",
          )}
        >
          <Logo />

          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-sm transition-colors",
                      active ? "text-foreground" : "text-muted hover:text-foreground",
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-surface-2/80 ring-1 ring-border"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="hidden sm:block">
              <Button href="/contact" size="sm" variant="primary">
                Let&apos;s talk
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="glass-soft grid h-10 w-10 place-items-center rounded-full text-foreground md:hidden"
            >
              {open ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-xl"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              className="glass absolute inset-x-3 top-24 rounded-3xl p-4"
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.25, ease: easeOutExpo }}
            >
              <ul className="flex flex-col">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i + 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg font-medium transition-colors",
                        isActive(item.href) ? "text-accent" : "text-foreground",
                      )}
                    >
                      {item.label}
                      <span className="font-mono text-xs text-muted">
                        0{i + 1}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-3 border-t border-border pt-3">
                <Button href="/contact" variant="primary" className="w-full">
                  Let&apos;s talk
                </Button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
