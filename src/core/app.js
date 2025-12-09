import express from "express";
import { errorHandler } from "./error.handler.js";
import { appRouter } from "../routes/index.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api", appRouter);

app.get("/", (req, res) => res.send("HireMe Modular Backend API Running..."));

app.use(errorHandler);

export default app;
