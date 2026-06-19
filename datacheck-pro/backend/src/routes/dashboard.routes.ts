import { Router } from "express";
import { customerOverview } from "../controllers/dashboard.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export const dashboardRoutes = Router();

dashboardRoutes.get("/overview", authMiddleware, customerOverview);
