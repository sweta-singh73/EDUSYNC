import express from "express";
import { createProfile } from "./profile.controller.js";
import upload from "../../middlewares/upload.middleware.js";

const router = express.Router();

router.post("/create-profile", upload.single("profile_pic"), createProfile);

export default router;
