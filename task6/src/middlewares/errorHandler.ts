import { NextFunction, Request, Response } from "express";
import { genereateResponse } from "../utils/response";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  res.status(500).send(genereateResponse(null, "Internal server error"));
};

export default errorHandler;
