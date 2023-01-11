import { Router } from "express";
import { home } from "../controller/product.controller.js";
export const router = Router();

router.get("/", home);
