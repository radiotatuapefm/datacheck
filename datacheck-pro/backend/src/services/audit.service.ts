import { randomUUID } from "node:crypto";
import { safeQuery } from "../config/db";

type LogEntry = {
  id: string;
  userId: string | null;
  action: string;
  context: Record<string, unknown> | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
};

const logs: LogEntry[] = [];

export async function writeAuditLog(input: Omit<LogEntry, "id" | "createdAt">) {
  const entry: LogEntry = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...input
  };
  logs.unshift(entry);
  if (logs.length > 1000) logs.pop();
  await safeQuery(
    "INSERT INTO audit_logs (id, user_id, action, context, ip_address, user_agent) VALUES ($1,$2,$3,$4,$5,$6)",
    [entry.id, entry.userId, entry.action, JSON.stringify(entry.context ?? {}), entry.ipAddress, entry.userAgent]
  );
}

export function listAuditLogs() {
  return logs;
}
