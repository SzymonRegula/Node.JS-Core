import { UserModel } from "../entities/user.entity";

const getUserById = async (id: string) => {
  try {
    const user = await UserModel.findOne({ id: id }, { _id: 0 });
    return user;
  } catch (error) {
    console.log(`Error getting user by id: ${(error as Error).message}`);
    throw error;
  }
};

export { getUserById };
