import { Router } from "express";
import { exportExcel, exportPdf } from "../controllers/export.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export const exportRoutes = Router();

exportRoutes.get("/pdf", authMiddleware, exportPdf);
exportRoutes.get("/excel", authMiddleware, exportExcel);
