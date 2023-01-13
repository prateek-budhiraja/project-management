import { Router } from "express";
import { home, login, profile, signup } from "../controller/auth.controller.js";
import { isAdmin, isLoggedIn } from "../middleware/auth.middleware.js";
const router = Router();

router.get("/", home);
router.post("/signup", isLoggedIn, isAdmin, signup);
router.post("/login", login);
router.get("/profile", isLoggedIn, profile);

export { router };
