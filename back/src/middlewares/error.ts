import { NextFunction, Request, Response } from "express";
import pino from "pino";
import { AppError } from "../errors";

const log = pino();

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  // Normaliza
  const status = err instanceof AppError ? err.status : 500;
  const code = err instanceof AppError ? err.code : "InternalServerError";
  const payload: any = { error: code, message: err.message };

  if (err.details) payload.details = err.details;

  // Log
  log.error({ err: { name: err?.name, message: err?.message, code, status } }, "request failed");

  // Respuesta
  res.status(status).json(payload);
}

