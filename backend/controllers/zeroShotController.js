// controllers/zeroShotController.js
import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Zero-Shot Prompting Example
export const zeroShotPrompt = async(req, res) => {
    try {
        const { task } = req.body;

        if (!task) {
            return res.status(400).json({ error: "Task is required" });
        }

        // Zero-shot: give the task directly without examples
        const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{
                role: "user",
                content: task, // direct instruction, no prior examples
            }, ],
            max_tokens: 150,
        });

        res.json({ result: completion.choices[0].message.content });
    } catch (error) {
        console.error("Zero-Shot Error:", error.message);
        res.status(500).json({ error: "Something went wrong" });
    }
};