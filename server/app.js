import express from "express";
import dbConnect from "./config/db.connection.js";
import cookieParser from "cookie-parser";
import { router as productRouter } from "./route/project.route.js";
import { router as authRouter } from "./route/auth.route.js";
import { router as adminRouter } from "./route/admin.route.js";
import cors from "cors";

const app = express();

dbConnect();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		credentials: true,
	})
);

app.use("/api", productRouter);
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);

export default app;
