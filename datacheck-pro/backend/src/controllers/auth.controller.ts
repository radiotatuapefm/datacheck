import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { env } from "../config/env";
import { writeAuditLog } from "../services/audit.service";
import { acceptTerms, authenticate, createApiKey, createUser } from "../services/users.service";

const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

function buildToken(input: { id: string; email: string; role: string }) {
  const signOptions: jwt.SignOptions = { expiresIn: env.jwtExpiresIn as jwt.SignOptions["expiresIn"] };
  return jwt.sign(
    {
      sub: input.id,
      email: input.email,
      role: input.role
    },
    env.jwtSecret,
    signOptions
  );
}

export async function register(req: Request, res: Response) {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());
  const user = await createUser(parsed.data);
  const token = buildToken({ id: user.id, email: user.email, role: user.role });
  await writeAuditLog({
    userId: user.id,
    action: "auth.register",
    context: { email: user.email },
    ipAddress: req.ip ?? null,
    userAgent: req.headers["user-agent"] ?? null
  });
  return res.status(201).json({ user, token });
}

export async function login(req: Request, res: Response) {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());
  const user = await authenticate(parsed.data.email, parsed.data.password);
  if (!user) return res.status(401).json({ message: "Credenciais inválidas." });
  const token = buildToken({ id: user.id, email: user.email, role: user.role });
  await writeAuditLog({
    userId: user.id,
    action: "auth.login",
    context: { email: user.email },
    ipAddress: req.ip ?? null,
    userAgent: req.headers["user-agent"] ?? null
  });
  return res.json({ user, token });
}

export async function me(req: Request, res: Response) {
  return res.json({ user: req.user });
}

export async function acceptTermsController(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ message: "Não autenticado." });
  const user = acceptTerms(req.user.id);
  if (!user) return res.status(404).json({ message: "Usuário não encontrado." });
  await writeAuditLog({
    userId: req.user.id,
    action: "terms.accepted",
    context: { accepted: true },
    ipAddress: req.ip ?? null,
    userAgent: req.headers["user-agent"] ?? null
  });
  return res.json({ user });
}

export async function generateApiKeyController(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ message: "Não autenticado." });
  const label = String(req.body?.label ?? "Default Key");
  const apiKey = createApiKey(req.user.id, label);
  await writeAuditLog({
    userId: req.user.id,
    action: "apikey.created",
    context: { label },
    ipAddress: req.ip ?? null,
    userAgent: req.headers["user-agent"] ?? null
  });
  return res.status(201).json({ apiKey, warning: "Guarde a chave em local seguro. Ela só é exibida uma vez." });
}

export async function socialGoogle(req: Request, res: Response) {
  await writeAuditLog({
    userId: null,
    action: "auth.social.google",
    context: { provider: "google", email: req.body?.email ?? null },
    ipAddress: req.ip ?? null,
    userAgent: req.headers["user-agent"] ?? null
  });
  return res.json({ message: "Fluxo Google configurado em modo inicial.", provider: "google" });
}

export async function socialMicrosoft(req: Request, res: Response) {
  await writeAuditLog({
    userId: null,
    action: "auth.social.microsoft",
    context: { provider: "microsoft", email: req.body?.email ?? null },
    ipAddress: req.ip ?? null,
    userAgent: req.headers["user-agent"] ?? null
  });
  return res.json({ message: "Fluxo Microsoft configurado em modo inicial.", provider: "microsoft" });
}

export async function setup2FA(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ message: "Não autenticado." });
  await writeAuditLog({
    userId: req.user.id,
    action: "auth.2fa.setup",
    context: { enabled: true },
    ipAddress: req.ip ?? null,
    userAgent: req.headers["user-agent"] ?? null
  });
  return res.json({
    enabled: true,
    secretPreview: "2FA-SETUP-CODE",
    message: "2FA inicializado. Integração com app autenticador pronta para extensão."
  });
}

export async function recoverPassword(req: Request, res: Response) {
  const email = String(req.body?.email ?? "");
  await writeAuditLog({
    userId: null,
    action: "auth.password.recover",
    context: { email },
    ipAddress: req.ip ?? null,
    userAgent: req.headers["user-agent"] ?? null
  });
  return res.json({
    email,
    message: "Solicitação de recuperação registrada. Token de reset deve ser enviado pelo provedor de e-mail."
  });
}
