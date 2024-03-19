import { Server } from "http";
import { Socket } from "net";
import { logger } from "../utils";

const shutdown = (server: Server, connections: Socket[]) => {
  logger.info("Received kill signal, shutting down gracefully");

  server.close(() => {
    logger.info("Closed out remaining connections");
    process.exit(0);
  });

  setTimeout(() => {
    logger.error(
      "Could not close connections in time, forcefully shutting down"
    );
    process.exit(1);
  }, 20000);

  // end current connections
  connections.forEach((connection) => connection.end());

  // then destroy connections
  setTimeout(() => {
    connections.forEach((connection) => connection.destroy());
  }, 10000);
};

export default shutdown;
