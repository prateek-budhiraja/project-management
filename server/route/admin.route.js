import { Router } from "express";
import { exportProjects } from "../controller/admin.controller.js";
import { isAdmin, isLoggedIn } from "../middleware/auth.middleware.js";
const router = Router();

router.get("/export/projects", isLoggedIn, isAdmin, exportProjects);

export { router };
