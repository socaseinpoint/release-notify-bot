import express from "express";

const app = express();
app.use(express.json());

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const CHAT_ID = process.env.TELEGRAM_CHAT_ID || "";
const PORT = process.env.PORT || 3000;

if (!BOT_TOKEN || !CHAT_ID) {
  console.error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID env variables");
  process.exit(1);
}

async function sendTelegramMessage(text: string): Promise<boolean> {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text,
      parse_mode: "HTML",
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Telegram API error:", error);
    return false;
  }

  return true;
}

app.post("/notify", async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== "string") {
    res.status(400).json({ error: "Missing or invalid 'message' field" });
    return;
  }

  const success = await sendTelegramMessage(message);

  if (success) {
    res.json({ ok: true });
  } else {
    res.status(500).json({ error: "Failed to send message to Telegram" });
  }
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Release notify bot listening on port ${PORT}`);
});
