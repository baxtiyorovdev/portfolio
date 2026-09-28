import "server-only";
import { cache } from "react";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { eq } from "drizzle-orm";
import { getDb, schema } from "@/db";
import { portfolioData as defaults } from "@/data/portfolioData";
import { portfolioSchema } from "./content-schema";
import type { PortfolioData } from "@/types";

export const CONTENT_TAG = "portfolio-content";
const CONTENT_ID = "portfolio";

type StoredContent = { data: PortfolioData; updatedAt: Date };

async function readStored(): Promise<StoredContent | null> {
  const db = getDb();
  if (!db) return null;

  const [row] = await db
    .select()
    .from(schema.siteContent)
    .where(eq(schema.siteContent.id, CONTENT_ID))
    .limit(1);
  if (!row) return null;

  // Shallow-merge onto defaults so sections added later still have content.
  const parsed = portfolioSchema.safeParse({ ...defaults, ...row.data });
  if (!parsed.success) {
    console.error("[content] Stored content is invalid, using defaults:", parsed.error.issues.slice(0, 3));
    return null;
  }
  return { data: parsed.data, updatedAt: row.updatedAt };
}

const readCached = unstable_cache(async () => (await readStored())?.data ?? null, ["portfolio-content"], {
  tags: [CONTENT_TAG],
});

/**
 * Site content for public pages: the database document when configured and
 * reachable, otherwise the static defaults in src/data/portfolioData.ts.
 * Cached across requests (invalidated on save) and deduped within a render.
 */
export const getPortfolio = cache(async (): Promise<PortfolioData> => {
  if (!process.env.DATABASE_URL) return defaults;
  try {
    return (await readCached()) ?? defaults;
  } catch (error) {
    console.error("[content] Failed to load content, using defaults:", error);
    return defaults;
  }
});

/** Uncached read for the admin panel, plus where the content came from. */
export async function getPortfolioForAdmin(): Promise<{
  data: PortfolioData;
  source: "database" | "defaults" | "no-database";
  updatedAt: Date | null;
}> {
  if (!getDb()) return { data: defaults, source: "no-database", updatedAt: null };
  const stored = await readStored();
  return stored
    ? { data: stored.data, source: "database", updatedAt: stored.updatedAt }
    : { data: defaults, source: "defaults", updatedAt: null };
}

/**
 * Applies `update` to the current content, validates the whole document,
 * saves it and regenerates every public page.
 */
export async function saveContent(update: (current: PortfolioData) => PortfolioData): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("DATABASE_URL is not configured, so content can't be saved.");

  const current = (await readStored())?.data ?? defaults;
  const next = portfolioSchema.parse(update(current));
  const now = new Date();

  await db
    .insert(schema.siteContent)
    .values({ id: CONTENT_ID, data: next, updatedAt: now })
    .onConflictDoUpdate({ target: schema.siteContent.id, set: { data: next, updatedAt: now } });

  revalidateTag(CONTENT_TAG);
  revalidatePath("/", "layout");
}
