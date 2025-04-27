import express, { Request, Response } from "express";
import config from "./config/config";
import dotenv from "dotenv";
import { connectToDb } from "./database/connection";
import { errorHandle } from "./middleware/error.middleware";
import authRouter from "./routes/auth.routes";
import cors from "cors";
import { corsOptions } from "./cors/cors";
import cookieParser from "cookie-parser";
const app = express();
dotenv.config();

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", authRouter);
app.use(cookieParser());
app.use(errorHandle);

app.get("/", (req: Request, res: Response) => {
  res.json({
    status: "success",
    message: "Hello im backend typesript 🐼!",
  });
});

app.listen(config.port, () => {
  connectToDb();
  console.log(`✳️  Server running on port ${config.port}`);
});
