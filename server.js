const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({
  path: "../.env",
});

const corsConfig = {
  origin: [
    `http://localhost:${process.env.CLIENT_PORT}`,
    "http://s3-sohan-bucket.s3-website.ap-northeast-2.amazonaws.com",
    "https://goodganglabs-quest-frontend.vercel.app/",
  ],
  credentials: true,
};

const app = express();

const PORT = process.env.SERVER_PORT;

app.use(bodyParser.json());
app.use(cors(corsConfig));

app.get("/", (req, res) => {
  res.send("hello");
});
app.post("/api/google-tts/", async (req, res) => {
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
    const { status, data } = error.response;
    console.error("Error occurred:", error);
    res.status(status).json({ error: "Error occurred during API call." });
  }
});

app.post("/google-stt", async (req, res) => {});

app.post("/api/openai-chat/", async (req, res) => {
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
    const { status, data } = error.response;
    res.status(status).json({ error: "Error occurred during API call." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
