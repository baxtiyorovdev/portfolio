import { Hero } from "@/components/sections/Hero";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { AboutIntro } from "@/components/sections/AboutIntro";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { SkillsShowcase } from "@/components/sections/SkillsShowcase";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { profilePageSchema } from "@/lib/structured-data";

export default function Home() {
  return (
    <>
      <JsonLd data={profilePageSchema} />
      <Hero />
      <TechMarquee />
      <AboutIntro />
      <FeaturedProjects />
      <SkillsShowcase />
      <ContactCTA />
    </>
  );
}
