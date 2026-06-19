import { NextFunction, Request, Response } from "express";
import { getUserFromApiKey } from "../services/users.service";

export function apiKeyMiddleware(req: Request, res: Response, next: NextFunction) {
  const key = req.headers["x-api-key"];
  if (!key || typeof key !== "string") {
    return res.status(401).json({ message: "API Key ausente." });
  }
  const user = getUserFromApiKey(key);
  if (!user) return res.status(401).json({ message: "API Key inválida." });
  req.user = user;
  return next();
}
