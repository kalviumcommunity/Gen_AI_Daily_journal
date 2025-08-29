// routes/dynamicPromptRoutes.js
import express from "express";
import { dynamicPrompt } from "../controllers/dynamicPromptController.js";

const router = express.Router();

// POST /api/dynamic
router.post("/dynamic", dynamicPrompt);

export default router;