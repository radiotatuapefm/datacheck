import { randomUUID } from "node:crypto";
import { safeQuery } from "../config/db";

type PaymentRecord = {
  id: string;
  userId: string;
  method: "pix" | "credit_card";
  amountCents: number;
  status: "pending" | "paid" | "failed";
  reference: string;
  createdAt: string;
};

const payments: PaymentRecord[] = [];

export async function createCheckout(input: { userId: string; method: "pix" | "credit_card"; amountCents: number }) {
  const payment: PaymentRecord = {
    id: randomUUID(),
    userId: input.userId,
    method: input.method,
    amountCents: input.amountCents,
    status: "pending",
    reference: `pay_${randomUUID().slice(0, 8)}`,
    createdAt: new Date().toISOString()
  };
  payments.unshift(payment);
  await safeQuery(
    "INSERT INTO payments (id, user_id, gateway, method, amount_cents, status, external_reference) VALUES ($1,$2,$3,$4,$5,$6,$7)",
    [payment.id, payment.userId, "datacheck-gateway", payment.method, payment.amountCents, payment.status, payment.reference]
  );
  return {
    ...payment,
    pixPayload:
      input.method === "pix"
        ? {
            qrCode: `000201DATACHECKPRO${payment.reference}`,
            copyPasteCode: `PIX|${payment.reference}|${payment.amountCents}`
          }
        : null
  };
}

export function webhookUpdate(reference: string, status: "paid" | "failed") {
  const found = payments.find(item => item.reference === reference);
  if (!found) return null;
  found.status = status;
  void safeQuery("UPDATE payments SET status = $1 WHERE external_reference = $2", [status, reference]);
  return found;
}

export function listPayments() {
  return payments;
}
