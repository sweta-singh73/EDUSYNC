import express from "express";
import { deleteUser, getUser, updateUser } from "../modules/user/user.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";

const router = express.Router();

// ======================== Auth Routes ========================
router.get("/get-user", verifyToken, getUser);
router.put("/update-user", verifyToken, updateUser);
router.delete("/delete-user", verifyToken, deleteUser);

// ======================== Export ========================
export default router;
