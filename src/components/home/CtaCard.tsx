import { RiMailFill, RiMessage3Fill, RiVipCrownFill } from "react-icons/ri";
import { BentoCard } from "@/components/bento/BentoCard";
import { ActionButton } from "@/components/bento/Primitives";
import { emailHref } from "@/lib/portfolio";
import type { About } from "@/types";

/** "Let's Work Together" call-to-action (Figma Frame 286). */
export function CtaCard({ about }: { about: About }) {
  return (
    <BentoCard
      area="cta"
      aria-labelledby="cta-title"
      className="group items-center gap-[30px] overflow-hidden px-5 pb-10 pt-5 text-center md:justify-between wide:gap-0"
    >
      {/* Faint violet bloom behind the crown. */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-60px] size-[220px] -translate-x-1/2 rounded-full bg-primary/15 opacity-60 blur-[70px] transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative flex flex-col items-center gap-[25px]">
        <span className="grid size-[65px] place-items-center rounded-full bg-icon">
          <RiVipCrownFill
            aria-hidden
            className="size-7 text-primary transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110"
          />
        </span>
        <div className="flex flex-col items-center gap-[5px]">
          <h2 id="cta-title" className="text-xl font-semibold leading-6 text-fg">
            Let&rsquo;s Work Together
          </h2>
          <p className="px-2.5 py-1.5 text-sm font-medium text-muted">
            Let&apos;s Make Magic Happen Together!
          </p>
        </div>
      </div>

      <div className="relative flex w-full flex-col gap-3 lg:max-w-xl lg:flex-row wide:max-w-none wide:flex-col">
        <ActionButton href={emailHref(about)} icon={RiMailFill}>
          Email Me
        </ActionButton>
        <ActionButton href="/contact" icon={RiMessage3Fill}>
          Send a Message
        </ActionButton>
      </div>
    </BentoCard>
  );
}
