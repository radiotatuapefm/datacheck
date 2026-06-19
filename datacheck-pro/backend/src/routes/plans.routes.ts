import { Router } from "express";
import { listPlans } from "../controllers/plans.controller";

export const plansRoutes = Router();

plansRoutes.get("/", listPlans);
