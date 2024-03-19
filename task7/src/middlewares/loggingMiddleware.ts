import { NextFunction, Request, Response } from "express";
import { logger } from "../utils";

const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - startTime;

    const msg = `[${new Date().toUTCString()}] INFO ${req.method} ${
      req.originalUrl
    } - ${duration}ms`;

    logger.info(msg);
  });

  next();
};

export default loggingMiddleware;
