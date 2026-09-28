import type { Metadata } from "next";
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
import { getPortfolio } from "@/lib/content";
import { getAllTechnologies, getLatestSchool, getStats } from "@/lib/portfolio";
import { siteConfig } from "@/lib/site";
import { buildProfilePage } from "@/lib/structured-data";

// The home page is the profile: tell social/search crawlers whose it is.
export const metadata: Metadata = {
  title: { absolute: siteConfig.title },
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    firstName: siteConfig.givenName,
    lastName: siteConfig.familyName,
    username: siteConfig.handle,
  },
};

export default async function Home() {
  const data = await getPortfolio();

  return (
    <>
      <JsonLd data={buildProfilePage()} />
      {/* Wide displays: the exact Figma frame (1512×784) scaled to fit the screen
          via --bento-scale (see layout). Narrower screens re-flow the bento. */}
      <div className="flex min-h-dvh items-center">
        <main className="mx-auto w-full max-w-[1512px] px-4 py-4 sm:px-6 sm:py-6 wide:h-[784px] wide:w-[1512px] wide:max-w-none wide:shrink-0 wide:px-[50px] wide:py-[30px] wide:[zoom:var(--bento-scale,1)]">
          <RevealGroup mode="intro" className="bento">
            <StacksCard featuredStack={data.featuredStack} />
            <ProjectsCard projects={data.projects} />
            <ServicesCard services={data.services} />
            <StatsRow area="stats" stats={getStats(data)} />
            <ProfileCard about={data.about} school={getLatestSchool(data.resume)} />
            <ToolboxCard technologies={getAllTechnologies(data)} />
            <JourneyCard resume={data.resume} />
            <ProcessCard steps={data.workflow} />
            <SocialCard about={data.about} />
            <CtaCard about={data.about} />
          </RevealGroup>
        </main>
      </div>
    </>
  );
}
