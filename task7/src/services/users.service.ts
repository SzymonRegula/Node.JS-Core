import { UserRegistrationRequest } from "../entities/user.entity";
import * as usersRepository from "../repositories/users.repository";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const getUserById = (id: string) => {
  return usersRepository.getUserById(id);
};

const getUserByEmail = (email: string) => {
  return usersRepository.getUserByEmail(email);
};

const createUser = async (user: UserRegistrationRequest) => {
  const id = uuidv4();
  const encryptedPassword = bcrypt.hashSync(user.password, 10);

  const newUser = {
    ...user,
    id,
    password: encryptedPassword,
  };

  await usersRepository.createUser(newUser);

  const userResponse = {
    id: newUser.id,
    email: newUser.email,
    role: newUser.role,
  };

  return userResponse;
};

const loginUser = async (email: string, password: string) => {
  const user = await getUserByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return null;
  }

  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, process.env.TOKEN_KEY!, { expiresIn: "2h" });

  return token;
};

export { getUserById, getUserByEmail, createUser, loginUser };
