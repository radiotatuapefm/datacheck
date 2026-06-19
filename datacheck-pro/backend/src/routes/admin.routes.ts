import { Router } from "express";
import { adminOverview } from "../controllers/admin.controller";
import { adminOnly, authMiddleware } from "../middlewares/auth.middleware";

export const adminRoutes = Router();

adminRoutes.get("/overview", authMiddleware, adminOnly, adminOverview);
