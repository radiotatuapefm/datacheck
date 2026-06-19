import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT ?? 4000),
  nodeEnv: process.env.NODE_ENV ?? "development",
  databaseUrl: process.env.DATABASE_URL ?? "",
  jwtSecret: process.env.JWT_SECRET ?? "change-this-secret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "12h",
  apiKeySalt: process.env.API_KEY_SALT ?? "datacheck-salt",
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:3000"
};
