import { Request, Response, NextFunction } from "express";
import { Role } from "../entities/user.entity";
import { genereateResponse } from "../utils";

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const role = req.headers["x-user-role"] as Role;

  if (role !== "admin") {
    return res
      .status(403)
      .send(genereateResponse(null, "You are not an admin"));
  }
  next();
};

export default isAdmin;
