import { Request, Response } from "express";
import { listAuditLogs } from "../services/audit.service";
import { listAllConsultations } from "../services/consultations.service";
import { listPayments } from "../services/payment.service";
import { listUsers } from "../services/users.service";

export function adminOverview(_req: Request, res: Response) {
  const users = listUsers();
  const consultations = listAllConsultations();
  const payments = listPayments();
  const logs = listAuditLogs();
  return res.json({
    stats: {
      users: users.length,
      consultations: consultations.length,
      payments: payments.length,
      logs: logs.length
    },
    users,
    consultations: consultations.slice(0, 25),
    payments: payments.slice(0, 25),
    logs: logs.slice(0, 50)
  });
}
