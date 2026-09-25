# AT Live Stream — playlist category edition

## What changed
- **No login button and no Firebase configuration.**
- Clicking a category fetches its M3U playlist through `/api/playlist`.
- The server parses all `#EXTINF` entries and displays each channel as a card.
- Clicking a channel sends its direct stream URL to the HLS player.

## Run in VS Code
1. Open this folder in VS Code.
2. In Terminal run: `npm install`
3. Then run: `npm run dev`
4. Open `http://localhost:3000`

## Publish
Deploy to Vercel, Render, Railway, Firebase App Hosting, or another Node.js-compatible host. Do not use a plain static/HTML-only host because the playlist parser is a Next.js API route.

## Rights and compatibility
Publish only channels you are authorized to distribute. Some URLs can fail because of upstream downtime, CORS, geoblocking, DRM, or an embed restriction; this app does not bypass these restrictions.
