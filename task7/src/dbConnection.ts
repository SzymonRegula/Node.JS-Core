import mongoose from "mongoose";

const uri = "mongodb://root:nodegmp@localhost:27017/mydatabase";

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  authSource: "admin",
};

const connectToDB = async () => {
  try {
    await mongoose.connect(uri, options);
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.log(`Error connecting to MongoDB: ${(error as Error).message}`);
    throw error;
  }
};

export default connectToDB;
