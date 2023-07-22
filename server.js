const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");

const corsConfig = {
  origin: "http://localhost:5173",
  credentials: true,
};

const app = express();
const PORT = 3000;

dotenv.config();

app.use(bodyParser.json());
app.use(cors(corsConfig));

app.post("/google-tts", async (req, res) => {
  const audioContent = req.body.audioContent;
  const endpoint = req.body.endpoint;
  console.log("req body:", req.body);

  try {
    const API_KEY = process.env.GOOGLE_API_KEY;
    const BASE_URL = process.env.GOOGLE_TTS_BASE_URL;

    const headers = {
      "content-type": "applicaton/json; charset=UTF-8",
    };

    const response = await axios.post(
      `${BASE_URL}${endpoint}?key=${API_KEY}`,
      audioContent,
      { headers }
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "Error occurred during API call." });
  }
});

app.post("/google-stt", async (req, res) => {
  const audioContent = req.body;

  try {
    const otherApiKey = "YOUR_OTHER_API_KEY";
    const OTHER_BASE_URL = "https://api.example.com"; // Replace with the base URL of the other API

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${otherApiKey}`,
    };

    const response = await axios.post(
      `${OTHER_BASE_URL}/endpoint`,
      audioContent,
      { headers }
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "Error occurred during API call." });
  }
});

app.post("/openai-chat", async (req, res) => {
  const audioContent = req.body.content;
  const endpoint = req.body.endpoint;

  try {
    const API_KEY = process.env.OPENAI_API_KEY;
    const BASE_URL = process.env.OPENAI_BASE_URL;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    };

    const response = await axios.post(`${BASE_URL}/${endpoint}`, audioContent, {
      headers,
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "Error occurred during API call." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
