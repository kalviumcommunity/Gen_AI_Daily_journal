// controllers/multiShotController.js
import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Multi-Shot Prompting Example (Few-Shot)
export const multiShotPrompt = async(req, res) => {
    try {
        const { task } = req.body;

        if (!task) {
            return res.status(400).json({ error: "Task is required" });
        }

        // Provide multiple examples before asking the actual task
        const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{
                    role: "user",
                    content: "Translate this sentence into French: Good morning.",
                },
                {
                    role: "assistant",
                    content: "Bonjour.",
                },
                {
                    role: "user",
                    content: "Translate this sentence into French: How are you?",
                },
                {
                    role: "assistant",
                    content: "Comment ça va ?",
                },
                {
                    role: "user",
                    content: "Translate this sentence into French: I love programming.",
                },
                {
                    role: "assistant",
                    content: "J'adore la programmation.",
                },
                {
                    role: "user",
                    content: task, // New task provided by user
                },
            ],
            max_tokens: 150,
        });

        res.json({ result: completion.choices[0].message.content });
    } catch (error) {
        console.error("Multi-Shot Error:", error.message);
        res.status(500).json({ error: "Something went wrong" });
    }
};