import { Router } from "express";
import {
  executeB2BConsultation,
  executeConsultation,
  myConsultations
} from "../controllers/consultations.controller";
import { apiKeyMiddleware } from "../middlewares/api-key.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";
import { termsAcceptedRequired } from "../middlewares/terms.middleware";

export const consultationsRoutes = Router();

consultationsRoutes.get("/me", authMiddleware, myConsultations);
consultationsRoutes.post("/:module", authMiddleware, termsAcceptedRequired, executeConsultation);
consultationsRoutes.post("/b2b/cpf", apiKeyMiddleware, termsAcceptedRequired, executeB2BConsultation);
