import { Request, Response } from "express";

const plans = [
  {
    code: "starter",
    name: "Starter",
    monthlyQuota: 100,
    price: "R$ 199,00",
    features: ["100 consultas/mês", "Dashboard essencial", "Suporte por e-mail"]
  },
  {
    code: "business",
    name: "Business",
    monthlyQuota: 1000,
    price: "R$ 899,00",
    features: ["1.000 consultas/mês", "API B2B inclusa", "Relatórios avançados"]
  },
  {
    code: "enterprise",
    name: "Enterprise",
    monthlyQuota: "Ilimitado",
    price: "Sob consulta",
    features: ["Consultas ilimitadas", "SLA dedicado", "Gestor de conta"]
  }
];

export function listPlans(_req: Request, res: Response) {
  return res.json({ plans });
}
