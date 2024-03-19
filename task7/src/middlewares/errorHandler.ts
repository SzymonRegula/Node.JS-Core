import { NextFunction, Request, Response } from "express";
import { genereateResponse } from "../utils";
import { logger } from "../utils";

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(error);
  res.status(500).send(genereateResponse(null, "Internal server error"));
};

export default errorHandler;
