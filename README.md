# Release Notify Bot

Simple REST server for posting release notifications to Telegram.

## Deploy to Railway

1. Push this folder to a GitHub repo (or use Railway CLI)
2. Create new project on [Railway](https://railway.app)
3. Connect your repo
4. Add environment variables:
   - `TELEGRAM_BOT_TOKEN` — your Telegram bot token from [@BotFather](https://t.me/BotFather)
   - `TELEGRAM_CHAT_ID` — target chat ID
   - `PORT` — Railway sets this automatically

## API

### POST /notify

Send a message to Telegram.

```bash
curl -X POST https://your-app.railway.app/notify \
  -H "Content-Type: application/json" \
  -d '{"message": "🚀 New release v1.2.3!"}'
```

### GET /health

Health check endpoint.

## Local Development

```bash
npm install
npm run dev
```
