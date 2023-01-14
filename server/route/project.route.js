import { Router } from "express";
import { createProject, home } from "../controller/project.controller.js";
import { isLead, isLoggedIn } from "../middleware/auth.middleware.js";
const router = Router();

router.get("/", home);
router.post("/project/create", isLoggedIn, isLead, createProject);

export { router };
