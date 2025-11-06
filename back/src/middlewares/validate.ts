import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validate =
  (schema: ZodSchema, where: "body" | "params" | "query" = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req[where]);
    if (!parsed.success) {
      return res.status(422).json({ error: "ValidationError", details: parsed.error.flatten() });
    }
    (req as any)[where] = parsed.data;
    next();
  };
