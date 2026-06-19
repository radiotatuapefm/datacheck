import { Request, Response } from "express";
import { listByUser } from "../services/consultations.service";
import { listPayments } from "../services/payment.service";

export function customerOverview(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ message: "Não autenticado." });
  const history = listByUser(req.user.id);
  const payments = listPayments().filter(item => item.userId === req.user?.id);
  return res.json({
    user: req.user,
    stats: {
      totalConsultations: history.length,
      creditsAvailable: req.user.credits,
      favorites: Math.min(5, history.length),
      exportedReports: Math.max(0, history.length - 1)
    },
    notifications: [
      {
        id: "n1",
        title: "Compliance atualizado",
        message: "Novas listas restritivas sincronizadas.",
        createdAt: new Date().toISOString()
      }
    ],
    recentConsultations: history.slice(0, 10),
    payments
  });
}
