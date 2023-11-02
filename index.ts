import express, { Application, Response, Request } from "express";

import { DatabaseConnection } from "./database/DBcONFIG";
import { MainApp } from "./mainApp";

const app: Application = express();
const port: string | number | undefined = process.env.port || 2288;

MainApp(app);

const server = app.listen(port, () => {
  DatabaseConnection();
  console.log("connected");
});

process.on("uncaughtException", (error: Error) => {
  console.log("uncaughtException", error);

  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.log("unhandledRejection", reason);

  server.close(() => {
    process.exit(1);
  });
});
