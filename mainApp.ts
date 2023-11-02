import express, { Application, Request, Response } from "express";
import cors from "cors";
import auth from "./router/authRouter";
import product from "./router/productRouter";

export const MainApp = (app: Application) => {
  try {
    app.use(
      cors({
        origin: "*",
      })
    );
    app.use(express.json({ limit: "10mb" }));
    app.get("/", async (req: Request, res: Response): Promise<Response> => {
      try {
        return res.status(200).json({
          message: "aPI FOR sALES",
        });
      } catch (error) {
        return res.status(404).json({
          message: "eRROR WITH THE aPI FOR sALES",
        });
      }
    });
    app.use("/api", auth);
    app.use("/api", product);
  } catch (error) {
    console.log(error);
  }
};
