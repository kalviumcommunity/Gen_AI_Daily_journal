import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Example function we want the AI to call
function getWeather(city) {
    const weatherData = {
        Delhi: "Sunny, 35°C",
        London: "Cloudy, 18°C",
        Tokyo: "Rainy, 22°C",
    };
    return weatherData[city] || "Weather data not available";
}

// Function Calling Endpoint
export const functionCallPrompt = async(req, res) => {
    try {
        const { city } = req.body;

        if (!city) {
            return res.status(400).json({ error: "City is required" });
        }

        // Request the model to call our function
        const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{
                    role: "system",
                    content: "You are a smart assistant that can call functions when needed."
                },
                {
                    role: "user",
                    content: `What is the current weather in ${city}?`,
                },
            ],
            functions: [{
                name: "getWeather",
                description: "Get the weather for a specific city",
                parameters: {
                    type: "object",
                    properties: {
                        city: {
                            type: "string",
                            description: "Name of the city to get weather for",
                        },
                    },
                    required: ["city"],
                },
            }, ],
            function_call: { name: "getWeather" }, // enforce calling this function
            max_tokens: 200,
        });

        // Simulate the function call using the AI's arguments
        const args = JSON.parse(completion.choices[0].message.function_call.arguments);
        const weatherResult = getWeather(args.city);

        res.json({
            answer: `AI called getWeather for ${args.city} → ${weatherResult}`,
        });
    } catch (error) {
        console.error("Function Call Error:", error.message);
        res.status(500).json({ error: "Something went wrong" });
    }
};