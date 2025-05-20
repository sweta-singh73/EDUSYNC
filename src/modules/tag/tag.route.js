import express from "express";
import { createTag, getTag, getTags } from "./tag.controller.js";

const router = express.Router();

router.post("/create-tag", createTag);
router.get("/get-tag/:id", getTag);
router.get("/get-tags",getTags );

export default router;
