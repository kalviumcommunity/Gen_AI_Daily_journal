// routes/oneShotRoutes.js
import express from "express";
import { oneShotPrompt } from "../controllers/oneShotController.js";

const router = express.Router();

// POST /api/oneshot
router.post("/oneshot", oneShotPrompt);

export default router;