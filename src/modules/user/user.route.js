import express from "express";
import {
  deleteUser,
  getUser,
  updateUser,
} from "./user.controller.js";


const router = express.Router();

// ======================== Auth Routes ========================
router.get("/get-user", getUser);
router.put("/update-user", updateUser);
router.delete("/delete-user", deleteUser);

// ======================== Export ========================
export default router;
