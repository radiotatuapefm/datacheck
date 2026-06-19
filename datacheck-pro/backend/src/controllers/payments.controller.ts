import { Request, Response } from "express";
import { z } from "zod";
import { writeAuditLog } from "../services/audit.service";
import { createCheckout, webhookUpdate } from "../services/payment.service";

const checkoutSchema = z.object({
  method: z.enum(["pix", "credit_card"]),
  amountCents: z.number().int().min(100)
});

export async function checkout(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ message: "Não autenticado." });
  const parsed = checkoutSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());
  const result = await createCheckout({
    userId: req.user.id,
    method: parsed.data.method,
    amountCents: parsed.data.amountCents
  });
  await writeAuditLog({
    userId: req.user.id,
    action: "payment.checkout_created",
    context: result,
    ipAddress: req.ip ?? null,
    userAgent: req.headers["user-agent"] ?? null
  });
  return res.status(201).json(result);
}

export async function paymentWebhook(req: Request, res: Response) {
  const reference = String(req.body?.reference ?? "");
  const status = String(req.body?.status ?? "");
  if (!reference || !["paid", "failed"].includes(status)) {
    return res.status(400).json({ message: "Payload inválido." });
  }
  const updated = webhookUpdate(reference, status as "paid" | "failed");
  if (!updated) return res.status(404).json({ message: "Pagamento não encontrado." });
  await writeAuditLog({
    userId: updated.userId,
    action: "payment.webhook_received",
    context: { reference, status },
    ipAddress: req.ip ?? null,
    userAgent: req.headers["user-agent"] ?? null
  });
  return res.json({ ok: true });
}

export async function issueInvoice(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ message: "Não autenticado." });
  const invoiceNumber = `NF-${Date.now()}`;
  await writeAuditLog({
    userId: req.user.id,
    action: "payment.invoice_issued",
    context: { invoiceNumber },
    ipAddress: req.ip ?? null,
    userAgent: req.headers["user-agent"] ?? null
  });
  return res.json({
    invoiceNumber,
    status: "issued",
    pdfUrl: `https://billing.datacheckpro.local/invoices/${invoiceNumber}.pdf`
  });
}
