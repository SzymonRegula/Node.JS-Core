import { Request, Response } from "express";
import { genereateResponse } from "../utils";
import mongoose from "mongoose";

const checkHealth = async (req: Request, res: Response) => {
  const mongodbStatus = mongoose.connection.readyState === 1 ? "up" : "down";

  if (mongodbStatus === "down") {
    return res
      .status(500)
      .send(genereateResponse(null, "Error connecting to database"));
  }
  res.send(
    genereateResponse({
      message: "Application is healthy",
    })
  );
};

export { checkHealth };
