import { Request, Response } from "express";
import { z } from "zod";
import { listByUser, runConsultation } from "../services/consultations.service";
import { consumeCredits } from "../services/users.service";
import { writeAuditLog } from "../services/audit.service";

const moduleSchema = z.enum(["cpf", "cnpj", "veiculos", "telefonica", "enderecos", "kyc", "credito", "investigacao"]);

export async function executeConsultation(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ message: "Não autenticado." });
  const moduleParsed = moduleSchema.safeParse(req.params.module);
  if (!moduleParsed.success) return res.status(400).json({ message: "Módulo inválido." });

  const creditState = consumeCredits(req.user.id, 1);
  if (creditState === "insufficient") return res.status(402).json({ message: "Créditos insuficientes." });

  const consultation = await runConsultation({
    userId: req.user.id,
    module: moduleParsed.data,
    payload: req.body ?? {}
  });

  await writeAuditLog({
    userId: req.user.id,
    action: "consultation.executed",
    context: {
      module: moduleParsed.data,
      consultationId: consultation.id,
      payload: req.body ?? {}
    },
    ipAddress: req.ip ?? null,
    userAgent: req.headers["user-agent"] ?? null
  });

  return res.status(201).json({
    consultation,
    remainingCredits: creditState
  });
}

export async function executeB2BConsultation(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ message: "Não autenticado." });
  req.params.module = "cpf";
  return executeConsultation(req, res);
}

export async function myConsultations(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ message: "Não autenticado." });
  return res.json({ items: listByUser(req.user.id) });
}
