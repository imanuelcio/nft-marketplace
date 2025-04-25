import express, { Request, Response } from "express";
import config from "./config/config";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.get("/", (req: Request, res: Response) => {
  res.json({
    status: "success",
    message: "Hello From Backend Server typeScript",
  });
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
