import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.error("MongoDB error:", err));

// Routes
app.use("/api/chat", chatRoutes);

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));