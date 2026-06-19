import swaggerJSDoc from "swagger-jsdoc";
import { env } from "./config/env";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "DataCheck Pro API",
      version: "1.0.0",
      description: "API REST para KYC, Compliance, Consultas Cadastrais e Crédito."
    },
    servers: [
      {
        url: `http://localhost:${env.port}/api/v1`
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer"
        },
        apiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "x-api-key"
        }
      }
    }
  },
  apis: []
});
