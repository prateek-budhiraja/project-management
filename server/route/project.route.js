import { Router } from "express";
import {
	addTask,
	createProject,
	home,
} from "../controller/project.controller.js";
import { isLead, isLoggedIn } from "../middleware/auth.middleware.js";
const router = Router();

router.get("/", home);
router.post("/project/create", isLoggedIn, isLead, createProject);
router.patch("/project/:pid/task/add", isLoggedIn, addTask);

export { router };
