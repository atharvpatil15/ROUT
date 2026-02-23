# ROUT (Unified Node + Next.js)

ROUT now runs as a single project:

- Frontend: Next.js (`next-client`)
- Backend API: Express (`server/src`)
- Runtime: One Node.js process (`server/src/mergedServer.js`)

## Project Layout

```text
ROUT/
|-- next-client/      # Next.js app router frontend
|-- server/           # Express APIs, auth, DB models
|-- package.json      # unified install/build/start scripts
```

## Local Run

1. Configure `server/.env`:

```env
DB_URL=your_mongo_connection
SESSION_SECRET=your_secret
SESSION_EXPIRY=7d
COOKIE_EXPIRY=7
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FRONTEND_URL=http://localhost:5000
NODE_ENV=development
PORT=5000
```

2. Install all dependencies from root:

```bash
npm install
```

3. Build frontend:

```bash
npm run build
```

4. Start unified app:

```bash
npm start
```

Open: `http://localhost:5000`

## Deploy (Single Service)

Use one service (Render/Railway/Fly):

- Build Command: `npm install && npm run build`
- Start Command: `npm start`

Set env vars from `server/.env` on the platform.
Set `FRONTEND_URL` to your deployed domain.

## Legacy Folder

`client/` is legacy Vite frontend kept only as fallback reference.