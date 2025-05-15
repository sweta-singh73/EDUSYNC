import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "./user.controller.js";

const router = express.Router();

router.get("/get-user", getUser);
router.put("/update-user", updateUser);
router.delete("/delete-user", deleteUser);
router.get("/get-users", getUsers);

export default router;
