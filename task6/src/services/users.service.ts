import * as usersRepository from "../repositories/users.repository";

const getUserById = (id: string) => {
  return usersRepository.getUserById(id);
};

export { getUserById };
