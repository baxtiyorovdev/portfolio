import { about, educationTimeline, projects, resume } from "@/lib/portfolio";
import { siteConfig } from "@/lib/site";

const absolute = (path: string) => new URL(path, siteConfig.url).toString();

export const PERSON_ID = `${siteConfig.url}/#person`;
export const WEBSITE_ID = `${siteConfig.url}/#website`;

const person = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: about.name,
  alternateName: "Baxtiyorov",
  url: siteConfig.url,
  image: absolute(about.image),
  jobTitle: about.title,
  description: siteConfig.description,
  email: `mailto:${about.social.email}`,
  telephone: about.social.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Qashqadaryo",
    addressCountry: "UZ",
  },
  knowsLanguage: about.languages,
  knowsAbout: resume.skills.map((skill) => skill.name),
  alumniOf: educationTimeline.map((item) => ({
    "@type": "EducationalOrganization",
    name: item.place,
  })),
  sameAs: [
    about.social.github,
    about.social.telegram,
    about.social.instagram,
  ].filter(Boolean),
};

const website = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: siteConfig.url,
  name: siteConfig.name,
  description: siteConfig.description,
  inLanguage: "en",
  publisher: { "@id": PERSON_ID },
};

/** Global graph (Person + WebSite) — rendered on every page via the layout. */
export const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [person, website],
};

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

export const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: siteConfig.url,
  name: siteConfig.title,
  description: siteConfig.description,
  inLanguage: "en",
  mainEntity: { "@id": PERSON_ID },
};

export const projectsCollectionSchema = {
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

export const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: absolute("/contact"),
  name: `Contact — ${siteConfig.name}`,
  mainEntity: { "@id": PERSON_ID },
};
