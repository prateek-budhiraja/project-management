import { Router } from "express";
import {
	addTask,
	approveTask,
	assignTask,
	changeLead,
	changeProjectName,
	changeTaskStatus,
	createProject,
	getProjects,
	home,
} from "../controller/project.controller.js";
import { isAdmin, isLead, isLoggedIn } from "../middleware/auth.middleware.js";
import {
	isProjectLead,
	isProjectTLead,
	setProject,
	setTProject,
} from "../middleware/project.middleware.js";
const router = Router();

router.get("/", home);

router.post("/project/create", isLoggedIn, isLead, createProject);
router.patch("/project/:pid/task/add", isLoggedIn, setProject, addTask);
router.patch(
	"/project/:pid/name/edit",
	isLoggedIn,
	isProjectLead,
	changeProjectName
);
router.patch("/project/:pid/lead/edit", isLoggedIn, isAdmin, changeLead);

router.patch("/task/:tid/status", isLoggedIn, setTProject, changeTaskStatus);
router.patch("/task/:tid/assign", isLoggedIn, isProjectTLead, assignTask);
router.patch("/task/:tid/approve", isLoggedIn, isProjectTLead, approveTask);

router.get("/projects", isLoggedIn, getProjects);

export { router };
