import { Request, Response } from "express";

export function exportPdf(_req: Request, res: Response) {
  return res.json({
    format: "pdf",
    url: "https://downloads.datacheckpro.local/reports/report-latest.pdf",
    message: "Exportação PDF preparada."
  });
}

export function exportExcel(_req: Request, res: Response) {
  return res.json({
    format: "xlsx",
    url: "https://downloads.datacheckpro.local/reports/report-latest.xlsx",
    message: "Exportação Excel preparada."
  });
}
