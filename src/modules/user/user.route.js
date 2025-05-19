import express from "express";
import {
  deleteUser,
  getAllData,
  getUser,
  getUsers,
  updateUser,
} from "./user.controller.js";

const router = express.Router();

router.get("/get-user", getUser);
router.put("/update-user", updateUser);
router.delete("/delete-user", deleteUser);
router.get("/get-users", getUsers);
router.get("/get-all-info", getAllData);
export default router;
