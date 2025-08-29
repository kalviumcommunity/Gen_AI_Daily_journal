// controllers/oneShotController.js
import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// One-Shot Prompting Example
export const oneShotPrompt = async(req, res) => {
    try {
        const { task } = req.body;

        if (!task) {
            return res.status(400).json({ error: "Task is required" });
        }

        // Provide ONE example before asking the model to do a new task
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
                    content: task,
                },
            ],
            max_tokens: 150,
        });

        res.json({ result: completion.choices[0].message.content });
    } catch (error) {
        console.error("One-Shot Error:", error.message);
        res.status(500).json({ error: "Something went wrong" });
    }
};