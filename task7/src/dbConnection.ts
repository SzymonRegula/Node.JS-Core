import mongoose from "mongoose";
import { logger } from "./utils";

// const user = process.env.DB_USER;
// const password = process.env.DB_PASSWORD;
// const host = process.env.DB_HOST;
// const port = process.env.DB_PORT;
// const database = process.env.DB_NAME;

// const uri = `mongodb://${user}:${password}@${host}:${port}/${database}`;
const uri = process.env.DB_CONNECTION_STRING!;

const options = {
  authSource: "admin",
};

const connectToDB = async () => {
  try {
    await mongoose.connect(uri, options);
    logger.info("Successfully connected to MongoDB");
  } catch (error) {
    logger.error(`Error connecting to MongoDB: ${(error as Error).message}`);
    throw error;
  }
};

export default connectToDB;
