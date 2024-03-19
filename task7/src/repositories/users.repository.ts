import { UserEntity, UserModel } from "../entities/user.entity";
import { logger } from "../utils";

const getUserById = async (id: string) => {
  try {
    const user = await UserModel.findOne({ id: id }, { _id: 0 });
    return user;
  } catch (error) {
    logger.error(`Error getting user by id: ${(error as Error).message}`);
    throw error;
  }
};

const getUserByEmail = async (email: string) => {
  try {
    const user = await UserModel.findOne(
      { email },
      {
        _id: 0,
        __v: 0,
      }
    );
    return user;
  } catch (error) {
    logger.error(`Error getting user by email: ${(error as Error).message}`);
    throw error;
  }
};

const createUser = async (user: UserEntity) => {
  try {
    const newUser = new UserModel(user);
    await newUser.save();
  } catch (error) {
    logger.error(`Error creating user: ${(error as Error).message}`);
    throw error;
  }
};

export { getUserById, getUserByEmail, createUser };
