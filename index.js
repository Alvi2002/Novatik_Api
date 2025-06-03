const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", async (req, res) => {
  const videoUrl = req.query.url;

  if (!videoUrl) {
    return res.status(400).json({ error: "Missing 'url' query parameter" });
  }

  try {
    const response = await axios.get("https://tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com/vid/index", {
      params: { url: videoUrl },
      headers: {
        "X-RapidAPI-Key": "2b0e0e8603msh6fc9d0eadb67f38p14aeeajsnf0b5d22412d6",
        "X-RapidAPI-Host": "tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com"
      }
    });

    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch video" });
  }
});

app.listen(3000, () => {
  console.log("API running on port 3000");
});

module.exports = app;
