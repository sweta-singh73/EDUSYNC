import express from "express";
import { createPost, deletePost } from "./post.controller.js";

const router = express.Router();

router.post("/create-post", createPost);
router.delete("/delete-post/:id", deletePost);

export default router;
