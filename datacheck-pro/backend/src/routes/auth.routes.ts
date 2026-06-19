import { Router } from "express";
import {
  acceptTermsController,
  generateApiKeyController,
  login,
  me,
  recoverPassword,
  register,
  setup2FA,
  socialGoogle,
  socialMicrosoft
} from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.get("/me", authMiddleware, me);
authRoutes.post("/terms/accept", authMiddleware, acceptTermsController);
authRoutes.post("/api-keys", authMiddleware, generateApiKeyController);
authRoutes.post("/social/google", socialGoogle);
authRoutes.post("/social/microsoft", socialMicrosoft);
authRoutes.post("/2fa/setup", authMiddleware, setup2FA);
authRoutes.post("/password/recover", recoverPassword);
