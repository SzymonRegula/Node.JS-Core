import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { genereateResponse } from "../utils";

const schema = Joi.object({
  productId: Joi.string().guid({ version: "uuidv4" }).required(),
  count: Joi.number().integer().min(0).required(),
});

const validateUpdateCart = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(genereateResponse(null, error.message));
  }
  next();
};

export default validateUpdateCart;
