import express from "express";
// controller imports
import { getFeedPosts, getUserPosts, likePost } from "../controllers/Posts.js";
// import verifyTokem middleware
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// read
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
// update
router.patch("/:id/like", verifyToken, likePost);

// delete

export default router;
