import { Router } from "express";
import { createProject, home } from "../controller/project.controller.js";
export const router = Router();

router.get("/", home);
router.post("/projects/create", createProject);
