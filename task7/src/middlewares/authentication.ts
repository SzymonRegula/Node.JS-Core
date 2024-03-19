import { NextFunction, Request, Response } from "express";
import { getUserById } from "../services/users.service";
import { genereateResponse } from "../utils";
import * as jwt from "jsonwebtoken";
import { Role } from "../entities/user.entity";

const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send(genereateResponse(null, "No token provided"));
  }

  const [tokenType, token] = authHeader.split(" ");

  if (tokenType !== "Bearer") {
    return res.status(403).send(genereateResponse(null, "Invalid token type"));
  }

  try {
    const user = jwt.verify(token, process.env.TOKEN_KEY!) as {
      id: string;
      email: string;
      role: Role;
    };

    const userFromDb = await getUserById(user.id);
    if (!userFromDb) {
      return res.status(403).send(genereateResponse(null, "Invalid Token"));
    }
    req.headers["x-user-id"] = user.id;
    req.headers["x-user-role"] = user.role;
  } catch (error) {
    return res.status(403).send(genereateResponse(null, "Invalid Token"));
  }

  next();
};

export default authentication;
