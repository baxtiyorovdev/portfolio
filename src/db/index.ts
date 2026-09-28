import "server-only";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

export type Database = NodePgDatabase<typeof schema>;

// Reuse one pool per server instance (and across dev hot reloads).
const globalForDb = globalThis as unknown as { pgPool?: Pool; db?: Database };

/**
 * Returns the database, or `null` when DATABASE_URL isn't configured — the
 * site then falls back to the static content in src/data and skips analytics.
 * On Vercel, use Neon's *pooled* connection string.
 */
export function getDb(): Database | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;

  if (!globalForDb.db) {
    const pool = new Pool({ connectionString: url, max: 3, idleTimeoutMillis: 10_000 });
    // Neon drops idle connections; without a listener the pool's "error" event
    // would crash the whole server process instead of just discarding the client.
    pool.on("error", (error) => console.error("[db] Idle client error:", error.message));
    globalForDb.pgPool = pool;
    globalForDb.db = drizzle(pool, { schema });
  }
  return globalForDb.db;
}

export { schema };
