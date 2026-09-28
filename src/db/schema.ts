import { bigserial, index, jsonb, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import type { PortfolioData } from "@/types";

/**
 * All editable site content lives in a single JSON document (id "portfolio"),
 * shaped exactly like `PortfolioData`. Small, edited by one admin, and read
 * whole on every render — a document beats a dozen join tables here.
 */
export const siteContent = pgTable("site_content", {
  id: text("id").primaryKey(),
  data: jsonb("data").$type<PortfolioData>().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

/**
 * One row per tracked page view. No IP address is stored: `visitorId` is a
 * salted hash of IP + user agent that rotates daily, enough to count unique
 * visitors per day without identifying anyone.
 */
export const pageViews = pgTable(
  "page_views",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    path: varchar("path", { length: 200 }).notNull(),
    referrer: varchar("referrer", { length: 200 }),
    country: varchar("country", { length: 2 }),
    region: varchar("region", { length: 16 }),
    city: varchar("city", { length: 80 }),
    device: varchar("device", { length: 10 }).notNull(),
    browser: varchar("browser", { length: 24 }).notNull(),
    os: varchar("os", { length: 24 }).notNull(),
    visitorId: varchar("visitor_id", { length: 32 }).notNull(),
  },
  (table) => [
    index("page_views_created_at_idx").on(table.createdAt),
    index("page_views_country_idx").on(table.country),
  ],
);

/** Failed admin logins, keyed by hashed IP, for brute-force throttling. */
export const loginAttempts = pgTable(
  "login_attempts",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    ipHash: varchar("ip_hash", { length: 32 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [index("login_attempts_ip_idx").on(table.ipHash, table.createdAt)],
);
