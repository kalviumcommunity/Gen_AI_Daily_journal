// routes/zeroShotRoutes.js
import express from "express";
import { zeroShotPrompt } from "../controllers/zeroShotController.js";

const router = express.Router();

// POST /api/zeroshot
router.post("/zeroshot", zeroShotPrompt);

export default router;