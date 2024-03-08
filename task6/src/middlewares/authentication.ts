import { NextFunction, Request, Response } from "express";
import { getUserById } from "../services/users.service";
import { genereateResponse } from "../utils/response";

const authentication = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.headers["x-user-id"] as string;

  if (!userId) {
    res
      .status(403)
      .send(genereateResponse(null, "You must be authorized user"));
  }

  const user = getUserById(userId);
  if (!user) {
    res.status(401).send(genereateResponse(null, "User is not authorized"));
  }

  next();
};

export default authentication;
