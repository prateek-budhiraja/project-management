import { Router } from "express";
import {
	exportProjects,
	exportUsers,
	userReport,
} from "../controller/admin.controller.js";
import { isAdmin, isLoggedIn } from "../middleware/auth.middleware.js";
const router = Router();

router.get("/export/projects", isLoggedIn, isAdmin, exportProjects);
router.get("/export/users", isLoggedIn, isAdmin, exportUsers);
router.get("/export/users/report", isLoggedIn, isAdmin, userReport);

export { router };
