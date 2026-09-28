import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.title,
    short_name: "Baxtiyorov",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#050505",
    icons: [
      { src: "/icon", sizes: "192x192", type: "image/png" },
      { src: "/logo.jpg", sizes: "640x640", type: "image/jpeg" },
    ],
  };
}
