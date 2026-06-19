import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { AuthTokenPayload } from "../types";
import { getUserById } from "../services/users.service";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token JWT ausente." });
  }
  const token = header.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, env.jwtSecret) as AuthTokenPayload;
    const user = getUserById(payload.sub);
    if (!user) return res.status(401).json({ message: "Usuário não encontrado." });
    req.user = user;
    return next();
  } catch {
    return res.status(401).json({ message: "Token JWT inválido." });
  }
}

export function adminOnly(req: Request, res: Response, next: NextFunction) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Acesso restrito ao administrador." });
  }
  return next();
}
