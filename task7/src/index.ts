import "dotenv/config";
import express, { Request, Response } from "express";
import { Socket } from "net";
import connectToDB from "./dbConnection";
import { shutdown, logger } from "./utils";
import { authentication, errorHandler, loggingMiddleware } from "./middlewares";
import { authRouter, cartRouter, healthRouter, productRouter } from "./routers";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(loggingMiddleware);

connectToDB();

app.use(express.json());

app.use("/api/profile/cart", authentication, cartRouter);
app.use("/api/products", authentication, productRouter);
app.use("/api/auth", authRouter);
app.use("/health", healthRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});

app.use(errorHandler);

const server = app.listen(PORT, () => {
  logger.info(`Server running at http://localhost:${PORT}`);
});

// Graceful shutdown
let connections: Socket[] = [];

server.on("connection", (connection) => {
  // register connections
  connections.push(connection);

  // remove/filter closed connections
  connection.on("close", () => {
    connections = connections.filter(
      (currentConnection) => currentConnection !== connection
    );
  });
});

process.on("SIGTERM", () => shutdown(server, connections));
process.on("SIGINT", () => shutdown(server, connections));
