const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post("/google-tts", async (req, res) => {
  // 클라이언트로부터 받은 요청 데이터
  const audioContent = req.body;

  try {
    // 내부적으로 Google Cloud Speech-to-Text API를 호출하기 위한 API 키
    const googleApiKey = "YOUR_GOOGLE_API_KEY";
    const GOOGLE_BASE_URL = "https://speech.googleapis.com";

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${googleApiKey}`,
    };

    // Google Cloud Speech-to-Text API 호출
    const response = await axios.post(
      `${GOOGLE_BASE_URL}/v1/speech:recognize`,
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
