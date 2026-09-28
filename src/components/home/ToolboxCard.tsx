import { RiToolsFill } from "react-icons/ri";
import { BentoCard, CardHeader } from "@/components/bento/BentoCard";
import { Marquee } from "@/components/bento/Marquee";
import { getTech } from "@/lib/tech";

function LogoPill({ name }: { name: string }) {
  const { icon: Icon } = getTech(name);
  return (
    <span className="flex h-[49px] shrink-0 items-center gap-2 rounded-tile bg-tile px-[18px] text-[17px] font-bold tracking-tight text-[#8f8f8f] transition-colors duration-300 hover:text-fg">
      <Icon aria-hidden className="size-5 shrink-0" />
      <span className="whitespace-nowrap">{name}</span>
    </span>
  );
}

/** "Technologies I Use": logo rows in the style of the Figma client wall (Components 10 / 13). */
export function ToolboxCard({ technologies }: { technologies: string[] }) {
  const half = Math.ceil(technologies.length / 2);
  const rows = [technologies.slice(0, half), technologies.slice(half)];

  return (
    <BentoCard
      area="toolbox"
      aria-labelledby="toolbox-title"
      className="gap-[30px] overflow-hidden px-5 pb-[30px] pt-5"
    >
      <CardHeader icon={RiToolsFill} label="My Toolbox" title="Technologies I Use" id="toolbox-title" />

      <div className="fade-x -mx-5 mt-auto flex w-[calc(100%+40px)] flex-col gap-2.5">
        <Marquee direction="left" duration={30} gap={10}>
          {rows[0].map((name) => (
            <LogoPill key={name} name={name} />
          ))}
        </Marquee>
        <Marquee direction="right" duration={34} gap={10}>
          {rows[1].map((name) => (
            <LogoPill key={name} name={name} />
          ))}
        </Marquee>
      </div>

      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[79px] bg-gradient-to-t from-[#0d0d0d] to-transparent"
      />
    </BentoCard>
  );
}
