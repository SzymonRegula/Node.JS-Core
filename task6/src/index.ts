import express, { Request, Response } from "express";
import cartRouter from "./routers/cart.router";
import productRouter from "./routers/products.router";
import checkAuthentication from "./middlewares/authentication";
import errorHandler from "./middlewares/errorHandler";

const app = express();
const port = 8000;

app.use(express.json());

app.use("/api/profile/cart", checkAuthentication, cartRouter);
app.use("/api/products", checkAuthentication, productRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
