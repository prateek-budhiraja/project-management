import { Router } from "express";
import {
	deleteUser,
	home,
	login,
	logout,
	profile,
	signup,
	updateRole,
} from "../controller/auth.controller.js";
import { isAdmin, isLoggedIn } from "../middleware/auth.middleware.js";
const router = Router();

router.get("/", home);
router.post("/signup", isLoggedIn, isAdmin, signup);
router.post("/login", login);
router.get("/profile", isLoggedIn, profile);
router.patch("/update/:uid", isLoggedIn, isAdmin, updateRole);
router.delete("/delete/:uid", isLoggedIn, isAdmin, deleteUser);
router.post("/logout", isLoggedIn, logout);

export { router };
