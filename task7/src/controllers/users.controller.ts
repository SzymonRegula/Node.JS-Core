import { Request, Response } from "express";
import * as usersService from "../services/users.service";
import { genereateResponse } from "../utils";
import { UserRegistrationRequest } from "../entities/user.entity";

const registerUser = async (req: Request, res: Response) => {
  const user: UserRegistrationRequest = req.body;

  try {
    const userData = await usersService.createUser(user);
    res.send(genereateResponse(userData));
  } catch (error) {
    return res
      .status(500)
      .send(genereateResponse(null, "Internal server error"));
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const token = await usersService.loginUser(email, password);
    if (!token) {
      return res
        .status(404)
        .send(genereateResponse(null, "No user with such email or password"));
    }
    return res.send(genereateResponse({ token }));
  } catch (error) {
    return res
      .status(500)
      .send(genereateResponse(null, "Internal server error"));
  }
};

export { registerUser, loginUser };
