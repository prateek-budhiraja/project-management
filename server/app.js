import express from "express";
import { router as productRouter } from "./route/project.route.js";

const app = express();
app.use("/api", productRouter);

export default app;
