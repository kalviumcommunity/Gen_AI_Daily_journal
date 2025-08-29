import express from "express";
import { functionCallPrompt } from "../controllers/functionCallController.js";

const router = express.Router();

// POST /api/function-call
router.post("/function-call", functionCallPrompt);

export default router;