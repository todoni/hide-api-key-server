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
  // 클라이언트로부터 받은 요청 데이터
  const audioContent = req.body.audioContent;
  const endpoint = req.body.endpoint;
  console.log("req body:", req.body);

  try {
    // 내부적으로 Google Cloud Speech-to-Text API를 호출하기 위한 API 키
    const API_KEY = process.env.GOOGLE_API_KEY;
    const BASE_URL = process.env.GOOGLE_TTS_BASE_URL;

    const headers = {
      "content-type": "applicaton/json; charset=UTF-8",
    };

    // Google Cloud Speech-to-Text API 호출
    const response = await axios.post(
      `${BASE_URL}${endpoint}?key=${API_KEY}`,
      audioContent,
      { headers }
    );

    // API 응답을 클라이언트로 전달
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "Error occurred during API call." });
  }
});

app.post("/google-stt", async (req, res) => {
  // 클라이언트로부터 받은 요청 데이터
  const audioContent = req.body;

  try {
    // 내부적으로 다른 API를 호출하기 위한 API 키
    const otherApiKey = "YOUR_OTHER_API_KEY";
    const OTHER_BASE_URL = "https://api.example.com"; // Replace with the base URL of the other API

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${otherApiKey}`,
    };

    // 다른 API 호출
    const response = await axios.post(
      `${OTHER_BASE_URL}/endpoint`,
      audioContent,
      { headers }
    );

    // API 응답을 클라이언트로 전달
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "Error occurred during API call." });
  }
});

app.post("/openai-chat", async (req, res) => {
  // 클라이언트로부터 받은 요청 데이터
  const audioContent = req.body.content;
  const endpoint = req.body.endpoint;

  try {
    // 내부적으로 다른 API를 호출하기 위한 API 키
    const API_KEY = process.env.OPENAI_API_KEY;
    const BASE_URL = process.env.OPENAI_BASE_URL;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    };

    // 다른 API 호출
    const response = await axios.post(`${BASE_URL}/${endpoint}`, audioContent, {
      headers,
    });

    // API 응답을 클라이언트로 전달
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "Error occurred during API call." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
