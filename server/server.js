const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const app = express();
const PORT = 5000;


/* ==========================================
   OPENAI
========================================== */

const client = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});


/* ==========================================
   MIDDLEWARE
========================================== */

app.use(cors());
app.use(express.json());


/* ==========================================
   TEST ROUTE
========================================== */

app.get("/", (req, res) => {

    res.json({
        message: "Kisan Mithra server is running 🌾"
    });

});


/* ==========================================
   AI CHAT ROUTE
========================================== */

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
/* ==========================================
   START SERVER
========================================== */

app.listen(PORT, () => {

    console.log(
        `🌾 Kisan Mithra server running at http://localhost:${PORT}`
    );

});