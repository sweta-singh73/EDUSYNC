import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "./post.controller.js";

const router = express.Router();

router.post("/create-post", createPost);
router.delete("/delete-post/:id", deletePost);
router.put("/update-post/:id", updatePost);
router.get("/get-post/:id", getPost);
router.get("/get-posts", getPosts);

export default router;
