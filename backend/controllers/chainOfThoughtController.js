import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Chain-of-Thought Prompting Example
export const chainOfThoughtPrompt = async(req, res) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({ error: "Question is required" });
        }

        // Chain-of-Thought Prompt
        const cotMessage = `
You are a smart assistant. Answer the following question step by step,
showing your reasoning clearly before giving the final answer.

Question: ${question}
`;

        const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{
                    role: "system",
                    content: "You are a helpful assistant that explains reasoning step by step."
                },
                {
                    role: "user",
                    content: cotMessage,
                },
            ],
            temperature: 0.7,
            max_tokens: 500,
        });

        res.json({ answer: completion.choices[0].message.content });
    } catch (error) {
        console.error("Chain-of-Thought Prompt Error:", error.message);
        res.status(500).json({ error: "Something went wrong" });
    }
};