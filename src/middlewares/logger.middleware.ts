import { NextFunction, Request, Response } from 'express';

export function loggerGlobalMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
}
