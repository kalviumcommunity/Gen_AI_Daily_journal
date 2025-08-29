import { OpenAI } from "openai";
import Chat from "../models/Chat.js";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Handle chat request
export const createChat = async(req, res) => {
    try {
        const { userMessage } = req.body;

        if (!userMessage) {
            return res.status(400).json({ error: "User message is required" });
        }

        // Call OpenAI API
        const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a helpful AI writing assistant." },
                { role: "user", content: userMessage },
            ],
            max_tokens: 100,
        });

        const aiResponse = completion.choices[0].message.content;

        // Save conversation to DB
        const chat = new Chat({ userMessage, aiResponse });
        await chat.save();

        res.status(201).json(chat);
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Something went wrong" });
    }
};

// Fetch chat history
export const getChats = async(req, res) => {
    try {
        const chats = await Chat.find().sort({ createdAt: -1 });
        res.json(chats);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch chats" });
    }
};