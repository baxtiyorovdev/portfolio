import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import { BentoCard } from "@/components/bento/BentoCard";
import { RevealGroup } from "@/components/bento/RevealGroup";
import { socialLinks } from "@/components/home/SocialCard";
import { about } from "@/lib/portfolio";
import { SiteNav } from "./SiteNav";

/** Frame for sub-pages: bento nav, content cards revealed on scroll, footer card. */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[1512px] px-4 py-4 sm:px-6 sm:py-6 wide:px-[50px] wide:py-[30px]">
      <RevealGroup mode="scroll" className="flex flex-col gap-3">
        <SiteNav />
        <main className="flex flex-col gap-3">{children}</main>
        <SiteFooter />
      </RevealGroup>
    </div>
  );
}

function SiteFooter() {
  return (
    <BentoCard
      as="div"
      className="flex-col items-center justify-between gap-4 rounded-[16px] px-5 py-4 text-[13px] font-medium text-muted sm:flex-row"
    >
      <p>
        © {new Date().getFullYear()} {about.name}. Built with Next.js &amp; GSAP.
      </p>
      <ul className="flex gap-2">
        {socialLinks.map(({ label, href, icon: Icon }) => (
          <li key={label}>
            <a
              href={href}
              aria-label={label}
              {...(href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noreferrer noopener" })}
              className="grid size-[38px] place-items-center rounded-[10px] bg-icon text-soft transition-colors duration-300 hover:bg-primary hover:text-white"
            >
              <Icon aria-hidden className="size-[18px]" />
            </a>
          </li>
        ))}
      </ul>
    </BentoCard>
  );
}

type PageHeaderProps = {
  icon: IconType;
  label: string;
  title: ReactNode;
  description?: string;
  actions?: ReactNode;
};

/** Hero card at the top of each sub-page. */
export function PageHeader({ icon: Icon, label, title, description, actions }: PageHeaderProps) {
  return (
    <BentoCard className="relative gap-6 overflow-hidden p-6 sm:p-8 lg:flex-row lg:items-end lg:justify-between">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-24 size-[280px] rounded-full bg-primary/10 blur-[90px]"
      />
      <div className="relative flex max-w-2xl flex-col gap-3">
        <p className="flex w-fit items-center gap-2 rounded-full border-[0.5px] border-white/5 bg-surface px-3.5 py-1.5 text-sm font-medium text-muted">
          <Icon aria-hidden className="size-4 text-primary" />
          {label}
        </p>
        <h1 className="text-balance text-[32px] font-semibold leading-[1.15] tracking-tight text-fg sm:text-[40px]">
          {title}
        </h1>
        {description && (
          <p className="text-pretty text-[15px] font-medium leading-relaxed text-muted">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="relative flex flex-wrap gap-3">{actions}</div>}
    </BentoCard>
  );
}
