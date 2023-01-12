import express from "express";
import dbConnect from "./config/db.connection.js";
import { router as productRouter } from "./route/project.route.js";
import { router as authRouter } from "./route/auth.route.js";

const app = express();

dbConnect();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", productRouter);
app.use("/api/auth", authRouter);

export default app;
