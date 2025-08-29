// controllers/dynamicPromptController.js
import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Dynamic Prompting Example
export const dynamicPrompt = async(req, res) => {
    try {
        const { userName, mood, task } = req.body;

        if (!userName || !mood || !task) {
            return res.status(400).json({
                error: "userName, mood, and task are required"
            });
        }

        // Constructing a dynamic prompt
        const dynamicMessage = `You are a friendly AI journaling assistant. 
The user's name is ${userName} and they are feeling ${mood} today. 
Help them with this task: ${task}`;

        const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{
                    role: "system",
                    content: "You are a helpful assistant that adapts based on user context."
                },
                {
                    role: "user",
                    content: dynamicMessage,
                },
            ],
            max_tokens: 200,
        });

        res.json({ result: completion.choices[0].message.content });
    } catch (error) {
        console.error("Dynamic Prompt Error:", error.message);
        res.status(500).json({ error: "Something went wrong" });
    }
};