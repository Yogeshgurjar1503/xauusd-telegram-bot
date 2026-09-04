const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(express.text());

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID   = process.env.CHAT_ID;

app.post("/tv-webhook", async (req, res) => {
  try {
    const message = typeof req.body === "string" ? req.body : JSON.stringify(req.body);

    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: message,
    });

    res.status(200).send("ok");
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send("error");
  }
});

app.get("/", (req, res) => res.send("Webhook server is running"));

app.listen(process.env.PORT || 3000, () => console.log("Webhook server running"));
