import { getEducationTimeline } from "@/lib/portfolio";
import { siteConfig } from "@/lib/site";
import type { PortfolioData } from "@/types";

const absolute = (path: string) => new URL(path, siteConfig.url).toString();

export const PERSON_ID = `${siteConfig.url}/#person`;
export const WEBSITE_ID = `${siteConfig.url}/#website`;

/**
 * Global graph (Person + WebSite) — rendered on every page via the layout.
 * `alternateName` + `sameAs` are what let search engines tie "baxtiyorovdev",
 * other spellings and the social profiles to this one person and site.
 */
export function buildSiteGraph({ about, resume }: PortfolioData) {
  const address = {
    "@type": "PostalAddress",
    addressLocality: "Qarshi",
    addressRegion: "Qashqadaryo",
    addressCountry: "UZ",
  };

  const person = {
    "@type": "Person",
    "@id": PERSON_ID,
    name: siteConfig.name,
    givenName: siteConfig.givenName,
    familyName: siteConfig.familyName,
    alternateName: [...siteConfig.alternateNames, `@${siteConfig.handle}`],
    url: siteConfig.url,
    mainEntityOfPage: siteConfig.url,
    image: absolute(about.image),
    jobTitle: about.title,
    description: siteConfig.description,
    email: `mailto:${about.social.email}`,
    telephone: about.social.phone,
    address,
    homeLocation: { "@type": "Place", name: about.social.location, address },
    nationality: { "@type": "Country", name: "Uzbekistan" },
    knowsLanguage: about.languages,
    knowsAbout: resume.skills.map((skill) => skill.name),
    alumniOf: getEducationTimeline(resume).map((item) => ({
      "@type": "EducationalOrganization",
      name: item.place,
    })),
    sameAs: [about.social.github, about.social.telegram, about.social.instagram].filter(Boolean),
  };

  const website = {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: siteConfig.url,
    // Google picks the site name shown in results from these fields.
    name: siteConfig.name,
    alternateName: [siteConfig.handle, new URL(siteConfig.url).hostname],
    description: siteConfig.description,
    inLanguage: "en",
    publisher: { "@id": PERSON_ID },
    about: { "@id": PERSON_ID },
  };

  return { "@context": "https://schema.org", "@graph": [person, website] };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

export function buildProfilePage(dateModified: Date = new Date()) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${siteConfig.url}/#profile`,
    url: siteConfig.url,
    name: siteConfig.title,
    description: siteConfig.description,
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    dateModified: dateModified.toISOString(),
    mainEntity: { "@id": PERSON_ID },
  };
}

export function buildProjectsCollection({ projects }: PortfolioData) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    url: absolute("/projects"),
    name: `Projects — ${siteConfig.name}`,
    about: { "@id": PERSON_ID },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.title,
          description: project.description,
          ...(project.link ? { url: project.link } : {}),
          image: absolute(project.image),
          keywords: project.technologies.join(", "),
          author: { "@id": PERSON_ID },
        },
      })),
    },
  };
}

export const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: absolute("/contact"),
  name: `Contact — ${siteConfig.name}`,
  mainEntity: { "@id": PERSON_ID },
};
