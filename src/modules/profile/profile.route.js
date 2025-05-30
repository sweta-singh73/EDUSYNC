import express from "express";
import { createProfile, deleteProfile, getProfile } from "./profile.controller.js";
import upload from "../../middlewares/upload.middleware.js";

const router = express.Router();

router.post("/create-profile", upload.single("profile_pic"), createProfile);
router.delete("/delete-profile/:id", deleteProfile);
router.get("/get-profile/:id", getProfile);

export default router;
