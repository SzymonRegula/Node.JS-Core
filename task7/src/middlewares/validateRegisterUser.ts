import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { genereateResponse } from "../utils";
import { getUserByEmail } from "../services/users.service";

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("admin", "user").required(),
});

const validateRegisterUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(genereateResponse(null, error.message));
  }

  try {
    const user = await getUserByEmail(req.body.email);
    if (user) {
      return res
        .status(400)
        .send(genereateResponse(null, "User with such email already exists"));
    }
  } catch (error) {
    return res
      .status(500)
      .send(genereateResponse(null, "Internal server error"));
  }

  next();
};

export default validateRegisterUser;
