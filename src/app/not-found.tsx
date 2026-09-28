import { RiBriefcase4Fill, RiCompass3Fill, RiHome5Fill } from "react-icons/ri";
import { BentoCard } from "@/components/bento/BentoCard";
import { ActionButton, PrimaryButton } from "@/components/bento/Primitives";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center px-4 py-10">
      <BentoCard className="w-full max-w-md items-center gap-6 overflow-hidden px-6 py-10 text-center" reveal={false}>
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[-80px] size-[260px] -translate-x-1/2 rounded-full bg-primary/15 blur-[80px]"
        />
        <span className="relative grid size-[65px] place-items-center rounded-full bg-icon">
          <RiCompass3Fill aria-hidden className="size-7 text-primary" />
        </span>
        <div className="relative flex flex-col items-center gap-2">
          <p className="text-[64px] font-semibold leading-none tracking-tight text-muted">
            4<span className="text-primary">0</span>4
          </p>
          <h1 className="text-xl font-semibold text-fg">Page not found</h1>
          <p className="max-w-xs text-sm font-medium leading-relaxed text-muted">
            The page you&apos;re looking for drifted off the grid or never existed here.
          </p>
        </div>
        <div className="relative flex w-full flex-col gap-3 sm:flex-row">
          <PrimaryButton href="/" className="flex-1">
            <RiHome5Fill aria-hidden className="size-4" /> Back home
          </PrimaryButton>
          <ActionButton href="/projects" icon={RiBriefcase4Fill}>
            View projects
          </ActionButton>
        </div>
      </BentoCard>
    </main>
  );
}
