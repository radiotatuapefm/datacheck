import { NextFunction, Request, Response } from "express";

export function termsAcceptedRequired(req: Request, res: Response, next: NextFunction) {
  if (!req.user?.termsAccepted) {
    return res.status(412).json({
      message: "Aceite os Termos de Uso antes de realizar consultas.",
      legalReferences: [
        "LGPD",
        "Marco Civil da Internet",
        "Lei do Cadastro Positivo",
        "Normas de Prevenção à Lavagem de Dinheiro"
      ]
    });
  }
  return next();
}
