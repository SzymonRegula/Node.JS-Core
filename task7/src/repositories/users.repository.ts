import { UserEntity } from "../entities/user.entity";

const users: UserEntity[] = [
  {
    id: "0fe36d16-49bc-4aab-a227-f84df899a6cb",
  },
];

const getUserById = (id: string) => {
  return users.find((user) => user.id === id);
};

export { getUserById };
