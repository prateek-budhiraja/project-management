import { Router } from "express";
import {
	deleteUser,
	home,
	login,
	logout,
	profile,
	signup,
	updatePassword,
	updateRole,
	user,
	users,
} from "../controller/auth.controller.js";
import { isAdmin, isLoggedIn } from "../middleware/auth.middleware.js";
const router = Router();

router.get("/", home);
router.post("/signup", isLoggedIn, isAdmin, signup);
router.post("/login", login);
router.get("/profile", isLoggedIn, profile);
router.patch("/update/role/:uid", isLoggedIn, isAdmin, updateRole);
router.patch("/update/password/:uid", isLoggedIn, isAdmin, updatePassword);
router.delete("/delete/:uid", isLoggedIn, isAdmin, deleteUser);
router.post("/logout", isLoggedIn, logout);
router.get("/users", isLoggedIn, isAdmin, users);
router.get("/user/:uid", user);

export { router };
