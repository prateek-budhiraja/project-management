import { Router } from "express";
import {
	addTask,
	approveTask,
	assignTask,
	changeProjectName,
	changeTaskStatus,
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
router.patch("/project/:pid/name/edit", isLoggedIn, isLead, changeProjectName);

router.patch("/task/:tid/status", isLoggedIn, changeTaskStatus);
router.patch("/task/:tid/assign", isLoggedIn, isLead, assignTask);
router.patch("/task/:tid/approve", isLoggedIn, approveTask);

router.get("/projects", isLoggedIn, getProjects);

export { router };
