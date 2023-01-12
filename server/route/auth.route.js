import { Router } from "express";
import { home, signup } from "../controller/auth.controller.js";
const router = Router();

router.get("/", home);
router.post("/signup", signup);

export { router };
