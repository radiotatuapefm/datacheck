import bcrypt from "bcryptjs";
import { randomUUID, createHash } from "node:crypto";
import { AppUser, UserRole } from "../types";
import { env } from "../config/env";
import { safeQuery } from "../config/db";

const users = new Map<string, AppUser>();
const apiKeys = new Map<string, { userId: string; label: string; hash: string }>();

function seedAdmin() {
  if ([...users.values()].some(user => user.role === "admin")) return;
  const id = randomUUID();
  users.set(id, {
    id,
    name: "Admin DataCheck",
    email: "admin@datacheckpro.local",
    passwordHash: bcrypt.hashSync("admin123", 10),
    role: "admin",
    termsAccepted: true,
    credits: 999999,
    twoFactorEnabled: true,
    createdAt: new Date().toISOString()
  });
}

seedAdmin();

export async function createUser(input: { name: string; email: string; password: string; role?: UserRole }) {
  const exists = [...users.values()].find(user => user.email.toLowerCase() === input.email.toLowerCase());
  if (exists) throw new Error("E-mail já cadastrado.");
  const id = randomUUID();
  const user: AppUser = {
    id,
    name: input.name,
    email: input.email,
    passwordHash: await bcrypt.hash(input.password, 10),
    role: input.role ?? "customer",
    termsAccepted: false,
    credits: 25,
    twoFactorEnabled: false,
    createdAt: new Date().toISOString()
  };
  users.set(id, user);
  void safeQuery(
    "INSERT INTO users (id, name, email, password_hash, role, terms_accepted, two_factor_enabled) VALUES ($1,$2,$3,$4,$5,$6,$7) ON CONFLICT (email) DO NOTHING",
    [user.id, user.name, user.email, user.passwordHash, user.role, user.termsAccepted, user.twoFactorEnabled]
  );
  return sanitizeUser(user);
}

export async function authenticate(email: string, password: string) {
  const user = [...users.values()].find(item => item.email.toLowerCase() === email.toLowerCase());
  if (!user) return null;
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return null;
  return sanitizeUser(user);
}

export function getUserById(id: string) {
  const user = users.get(id);
  if (!user) return null;
  return sanitizeUser(user);
}

export function requireRawUser(id: string) {
  return users.get(id) ?? null;
}

export function acceptTerms(userId: string) {
  const user = users.get(userId);
  if (!user) return null;
  user.termsAccepted = true;
  users.set(userId, user);
  void safeQuery("UPDATE users SET terms_accepted = TRUE, updated_at = NOW() WHERE id = $1", [userId]);
  return sanitizeUser(user);
}

export function consumeCredits(userId: string, amount = 1) {
  const user = users.get(userId);
  if (!user) return null;
  if (user.credits < amount) return "insufficient";
  user.credits -= amount;
  users.set(userId, user);
  return user.credits;
}

export function listUsers() {
  return [...users.values()].map(sanitizeUser);
}

export function createApiKey(userId: string, label: string) {
  const plain = `dcp_${randomUUID().replaceAll("-", "")}`;
  const hash = createHash("sha256").update(`${plain}:${env.apiKeySalt}`).digest("hex");
  apiKeys.set(hash, { userId, label, hash });
  void safeQuery("INSERT INTO api_keys (user_id, label, key_hash) VALUES ($1,$2,$3)", [userId, label, hash]);
  return plain;
}

export function getUserFromApiKey(apiKey: string) {
  const hash = createHash("sha256").update(`${apiKey}:${env.apiKeySalt}`).digest("hex");
  const found = apiKeys.get(hash);
  if (!found) return null;
  return getUserById(found.userId);
}

function sanitizeUser(user: AppUser) {
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}
