import express from "express";
import { login } from "../controllers/Auth";

const router = express.Router();

// inside index file already defined '/auth' in app.use() so this will become eventually '/auth/login'
router.post("/login", login);

export default router;
