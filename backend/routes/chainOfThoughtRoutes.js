import express from "express";
import { chainOfThoughtPrompt } from "../controllers/chainOfThoughtController.js";

const router = express.Router();

// POST /api/cot
router.post("/cot", chainOfThoughtPrompt);

export default router;