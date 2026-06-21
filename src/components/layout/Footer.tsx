import Link from "next/link";
import { FaGithub, FaInstagram, FaTelegram } from "react-icons/fa";
import { FiArrowUp, FiMail } from "react-icons/fi";
import { about } from "@/lib/portfolio";
import { navItems, siteConfig } from "@/lib/site";
import { BrandMark } from "./BrandMark";

export function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    { href: about.social.github, label: "GitHub", icon: <FaGithub /> },
    { href: about.social.telegram, label: "Telegram", icon: <FaTelegram /> },
    { href: about.social.instagram, label: "Instagram", icon: <FaInstagram /> },
    { href: `mailto:${about.social.email}`, label: "Email", icon: <FiMail /> },
  ];

  return (
    <footer className="relative mt-28 border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <BrandMark />
            <span className="font-semibold">{about.name}</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            {siteConfig.description}
          </p>
          <div className="mt-6 flex gap-2.5">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={social.label}
                className="glass-soft grid h-10 w-10 place-items-center rounded-full text-muted transition-all duration-300 hover:-translate-y-0.5 hover:text-accent"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Footer">
          <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
            Pages
          </h3>
          <ul className="mt-5 space-y-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
            Contact
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-muted">
            <li>
              <a
                href={`mailto:${about.social.email}`}
                className="transition-colors hover:text-foreground"
              >
                {about.social.email}
              </a>
            </li>
            <li>{about.social.phone}</li>
            <li>{about.social.location}</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-border px-5 py-6 sm:flex-row sm:px-8">
        <p className="text-xs text-muted">
          © {year} {about.name}. All rights reserved.
        </p>
        <p className="text-center text-xs text-muted">
          Crafted with Next.js, Tailwind, Framer Motion &amp; GSAP.
        </p>
        <a
          href="#top"
          className="inline-flex items-center gap-2 text-xs text-muted transition-colors hover:text-accent"
        >
          Back to top <FiArrowUp />
        </a>
      </div>
    </footer>
  );
}
