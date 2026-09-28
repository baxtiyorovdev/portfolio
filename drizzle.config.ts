import { loadEnvConfig } from "@next/env";
import { defineConfig } from "drizzle-kit";

// Pick up DATABASE_URL from .env / .env.local the same way Next.js does.
loadEnvConfig(process.cwd());

// Schema changes go over a direct connection when available (Neon's Vercel
// integration provides DATABASE_URL_UNPOOLED); the app itself uses the pooled URL.
const url = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;

if (!url) {
  throw new Error("DATABASE_URL is not set — run `vercel env pull .env.local` or add it to .env.local (see README → Deploy).");
}

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url },
});
