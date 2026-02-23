import { createServer } from "node:http";
import "dotenv/config";
import { serveStatic } from "./utils/servestatic.js";
import { handleGet, handlePost } from "./handlers/route-handlers.js";

const PORT = process.env.PORT || 8080;

const __dirname = import.meta.dirname;

const server = createServer(async (req, res) => {
  if (req.url === "/api") {
    if (req.method === "GET") {
      return await handleGet(res);
    } else if (req.method === "POST") {
      handlePost(req, res);
    }
  } else if (!req.url.startsWith("/api")) {
    await serveStatic(req, res, __dirname);
  }
});

server.listen(PORT, () => {
  console.log(`➔ Server ready at: http://localhost:${PORT}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  console.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
