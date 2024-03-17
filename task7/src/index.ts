import "dotenv/config";
import express, { Request, Response } from "express";
import cartRouter from "./routers/cart.router";
import productRouter from "./routers/products.router";
import authRouter from "./routers/auth.router";
import checkAuthentication from "./middlewares/authentication";
import errorHandler from "./middlewares/errorHandler";
import connectToDB from "./dbConnection";

const app = express();
const port = 8000;

connectToDB();

app.use(express.json());

app.use("/api/profile/cart", checkAuthentication, cartRouter);
app.use("/api/products", checkAuthentication, productRouter);
app.use("/api/auth", authRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
