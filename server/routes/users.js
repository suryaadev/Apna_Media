import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriends,
} from "../controllers/Users.js";

import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Read Routes
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

// update
router.patch("/:id/:friendId", verifyToken, addRemoveFriends);

export default router;
