import express from "express";
import { createChat, getChats } from "../controllers/chatController.js";

const router = express.Router();

router.post("/", createChat); // POST /api/chat
router.get("/", getChats); // GET /api/chat

export default router;