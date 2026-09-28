import { RiStackFill } from "react-icons/ri";
import { BentoCard, CardHeader } from "@/components/bento/BentoCard";
import { LinkTile } from "@/components/bento/Primitives";
import { featuredStack } from "@/lib/portfolio";
import { getTech } from "@/lib/tech";

export function StacksCard() {
  return (
    <BentoCard area="stacks" aria-label="My stacks" className="gap-[30px] p-5">
      <CardHeader icon={RiStackFill} label="My Stacks" />
      <ul className="mt-auto grid grid-cols-2 gap-2">
        {featuredStack.map((name) => {
          const tech = getTech(name);
          return (
            <li key={name} className="min-w-0">
              <LinkTile
                href={tech.href}
                icon={tech.icon}
                label={name}
                ariaLabel={`${name} — official site`}
              />
            </li>
          );
        })}
      </ul>
    </BentoCard>
  );
}
