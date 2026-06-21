import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.title,
    short_name: "Baxtiyorov",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0c0a08",
    theme_color: "#0c0a08",
    icons: [
      { src: "/logo.jpg", sizes: "192x192", type: "image/jpeg" },
      { src: "/logo.jpg", sizes: "512x512", type: "image/jpeg" },
    ],
  };
}
