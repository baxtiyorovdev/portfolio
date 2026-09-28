import { loadEnvConfig } from "@next/env";
import { defineConfig } from "drizzle-kit";

// Pick up DATABASE_URL from .env / .env.local the same way Next.js does.
loadEnvConfig(process.cwd());

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set — add it to .env.local (see README → Admin panel).");
}

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url: process.env.DATABASE_URL },
});
