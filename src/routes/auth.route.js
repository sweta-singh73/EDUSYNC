import express from "express";
import { login, signup } from "../modules/auth/auth.controller.js";

const router = express.Router();

// ======================== Auth Routes ========================
router.post("/register", signup);
router.post("/login", login);

// ======================== Export ========================
export default router;
