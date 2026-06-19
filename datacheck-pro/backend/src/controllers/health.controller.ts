import { Request, Response } from "express";

export function health(_req: Request, res: Response) {
  return res.json({
    name: "DataCheck Pro API",
    status: "ok",
    timestamp: new Date().toISOString()
  });
}
