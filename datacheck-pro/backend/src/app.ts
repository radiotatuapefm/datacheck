import cors from "cors";
import express from "express";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { env } from "./config/env";
import { errorMiddleware } from "./middlewares/error.middleware";
import { adminRoutes } from "./routes/admin.routes";
import { authRoutes } from "./routes/auth.routes";
import { consultationsRoutes } from "./routes/consultations.routes";
import { dashboardRoutes } from "./routes/dashboard.routes";
import { exportRoutes } from "./routes/export.routes";
import { healthRoutes } from "./routes/health.routes";
import { paymentsRoutes } from "./routes/payments.routes";
import { plansRoutes } from "./routes/plans.routes";
import { swaggerSpec } from "./swagger";

export const app = express();

app.use(
  cors({
    origin: env.corsOrigin
  })
);
app.use(helmet());
app.use(express.json({ limit: "2mb" }));

app.get("/", (_req, res) => {
  res.json({
    name: "DataCheck Pro API",
    docs: `/api/v1/docs`,
    legal: {
      lgpd: true,
      marcoCivilInternet: true,
      cadastroPositivo: true,
      antiMoneyLaundering: true
    }
  });
});

app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/plans", plansRoutes);
app.use("/api/v1/consultas", consultationsRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/payments", paymentsRoutes);
app.use("/api/v1/export", exportRoutes);
app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorMiddleware);
