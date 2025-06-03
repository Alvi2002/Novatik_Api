const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

const API_KEY = "2b0e0e8603msh6fc9d0eadb67f38p14aeeajsnf0b5d22412d6";

app.use(cors());

app.get("/", async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) {
    return res.status(400).json({ error: "Missing 'url' parameter" });
  }

  try {
    const response = await axios.get("https://tiktok-download-video-no-watermark.p.rapidapi.com/api", {
      params: { url: videoUrl },
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "tiktok-download-video-no-watermark.p.rapidapi.com",
      },
    });

    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch video" });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});