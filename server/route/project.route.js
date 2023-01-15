import { Router } from "express";
import {
	addTask,
	assignTask,
	createProject,
	getProjects,
	home,
} from "../controller/project.controller.js";
import { isLead, isLoggedIn } from "../middleware/auth.middleware.js";
import { setProject } from "../middleware/project.middleware.js";
const router = Router();

router.get("/", home);
router.post("/project/create", isLoggedIn, isLead, createProject);
router.patch("/project/:pid/task/add", isLoggedIn, setProject, addTask);
router.get("/projects", isLoggedIn, getProjects);
router.patch("/project/task/:tid/assign", isLoggedIn, isLead, assignTask);

export { router };
