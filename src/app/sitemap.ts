import type { MetadataRoute } from "next";
import { getPortfolio } from "@/lib/content";
import { siteConfig } from "@/lib/site";

const absolute = (path: string) => new URL(path, siteConfig.url).toString();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const { about, projects } = await getPortfolio();

  const routes: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    images?: string[];
  }[] = [
    { path: "", priority: 1, changeFrequency: "weekly", images: [absolute(about.avatar), absolute(about.image)] },
    { path: "/projects", priority: 0.9, changeFrequency: "weekly", images: projects.map((project) => absolute(project.image)) },
    { path: "/resume", priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    ...(route.images ? { images: route.images } : {}),
  }));
}
