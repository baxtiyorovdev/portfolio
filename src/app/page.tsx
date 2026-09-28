import { RevealGroup } from "@/components/bento/RevealGroup";
import { StacksCard } from "@/components/home/StacksCard";
import { ProjectsCard } from "@/components/home/ProjectsCard";
import { ServicesCard } from "@/components/home/ServicesCard";
import { StatsRow } from "@/components/home/StatsRow";
import { ProfileCard } from "@/components/home/ProfileCard";
import { ToolboxCard } from "@/components/home/ToolboxCard";
import { JourneyCard } from "@/components/home/JourneyCard";
import { ProcessCard } from "@/components/home/ProcessCard";
import { SocialCard } from "@/components/home/SocialCard";
import { CtaCard } from "@/components/home/CtaCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { profilePageSchema } from "@/lib/structured-data";

export default function Home() {
  return (
    <>
      <JsonLd data={profilePageSchema} />
      {/* Wide displays: the exact Figma frame (1512×784) scaled to fit the screen
          via --bento-scale (see layout). Narrower screens re-flow the bento. */}
      <div className="flex min-h-dvh items-center">
        <main className="mx-auto w-full max-w-[1512px] px-4 py-4 sm:px-6 sm:py-6 wide:h-[784px] wide:w-[1512px] wide:max-w-none wide:shrink-0 wide:px-[50px] wide:py-[30px] wide:[zoom:var(--bento-scale,1)]">
          <RevealGroup mode="intro" className="bento">
            <StacksCard />
            <ProjectsCard />
            <ServicesCard />
            <StatsRow area="stats" />
            <ProfileCard />
            <ToolboxCard />
            <JourneyCard />
            <ProcessCard />
            <SocialCard />
            <CtaCard />
          </RevealGroup>
        </main>
      </div>
    </>
  );
}
