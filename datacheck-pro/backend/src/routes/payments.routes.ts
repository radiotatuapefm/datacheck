import { Router } from "express";
import { checkout, issueInvoice, paymentWebhook } from "../controllers/payments.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export const paymentsRoutes = Router();

paymentsRoutes.post("/checkout", authMiddleware, checkout);
paymentsRoutes.post("/invoice", authMiddleware, issueInvoice);
paymentsRoutes.post("/webhooks/payment", paymentWebhook);
