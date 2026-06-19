import { Pool } from "pg";
import { env } from "./env";

let pool: Pool | null = null;

export function getPool() {
  if (!env.databaseUrl) return null;
  if (!pool) {
    pool = new Pool({
      connectionString: env.databaseUrl
    });
  }
  return pool;
}

export async function safeQuery<T = unknown>(query: string, values: unknown[] = []): Promise<T[]> {
  const currentPool = getPool();
  if (!currentPool) return [];
  try {
    const result = await currentPool.query(query, values);
    return result.rows as T[];
  } catch (error) {
    console.warn("[DB] Query falhou, fallback em memória:", error);
    return [];
  }
}
