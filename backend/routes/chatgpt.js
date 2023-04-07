const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const config = require("../config");

router.post("/", async (req, res) => {
  try {
    const { text, maxTokens, temperature, topP } = req.body;

    const response = await axios.post(config.chatGptUrl, {
      prompt: text,
      max_tokens: maxTokens,
      temperature: temperature,
      top_p: topP,
    });

    const completions = response.data.choices.map((c) => c.text);

    res.json({ success: true, completions: completions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error calling ChatGPT API" });
  }
});

module.exports = router;
