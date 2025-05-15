import express from "express";

const router = express.Router();

//routes
import authRoutes from "../modules/auth/auth.route.js";
import userRoutes from "../modules/user/user.route.js";
import profileRoutes from "../modules/profile/profile.route.js";
import postRoutes from "../modules/post/post.route.js";
import verifyToken from "../middlewares/auth.middleware.js";

//uses
router.use("/auth", authRoutes);
router.use("/user", verifyToken, userRoutes);
router.use("/profile", verifyToken, profileRoutes);
router.use("/post", verifyToken, postRoutes );

export default router;
