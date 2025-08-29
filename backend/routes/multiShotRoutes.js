// routes/multiShotRoutes.js
import express from "express";
import { multiShotPrompt } from "../controllers/multiShotController.js";

const router = express.Router();

// POST /api/multishot
router.post("/multishot", multiShotPrompt);

export default router;