const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");
const User = require("./models/User");
const app = express();
const PORT = process.env.PORT || 5000;


// ==========================================
// GEMINI AI
// ==========================================

const client = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});


// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());
app.use(express.json());


// ==========================================
// MONGODB CONNECTION
// ==========================================

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB Connected Successfully");
    })
    .catch((error) => {
        console.error("❌ MongoDB Connection Failed");
        console.error(error.message);
    });


// ==========================================
// TEST ROUTE
// ==========================================

app.get("/", (req, res) => {
    res.json({
        message: "Kisan Mithra server is running 🌾"
    });
});


// ==========================================
// AI CHAT ROUTE
// ==========================================

app.post("/api/chat", async (req, res) => {

    try {

        const userMessage = req.body.message;

        if (!userMessage || !userMessage.trim()) {

            return res.status(400).json({
                error: "Message is required."
            });

        }

        const response = await client.models.generateContent({

            model: "gemini-3.6-flash",

            contents: `
You are Kisan Mithra, a helpful agriculture
assistant for farmers.

Give clear, practical and easy-to-understand
answers about:

- crops
- soil
- irrigation
- weather
- farming practices
- pests
- plant diseases
- fertilizers
- farm management
- agricultural technology

Use simple language.

Do not pretend to know live weather or sensor
values unless they are provided by the website.

If a question requires professional agricultural
or scientific advice, clearly recommend checking
with a qualified local agricultural expert.

Farmer's question:
${userMessage}
`
        });

        const reply = response.text;

        res.json({
            reply: reply
        });

    } catch (error) {

        console.error("Gemini Error:", error);

        res.status(500).json({
            error: "Unable to connect to the AI assistant."
        });

    }

});

app.post("/api/register", async (req, res) => {

    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                error: "All fields are required."
            });
        }

        const existingUser = await User.findOne({
            email: email.toLowerCase()
        });

        if (existingUser) {
            return res.status(400).json({
                error: "User already exists."
            });
        }

        const bcrypt = require("bcryptjs");

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email: email.toLowerCase(),
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            message: "Registration successful!"
        });

    } catch (error) {

        console.error("Registration Error:", error);

        res.status(500).json({
            error: "Registration failed."
        });

    }

});

// ==========================================
// START SERVER
// ==========================================


app.listen(PORT, () => {

    console.log(
        `🌾 Kisan Mithra server running at http://localhost:${PORT}`
    );

});