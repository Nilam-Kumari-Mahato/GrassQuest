# GrassQuest

GrassQuest is a React/Vite nature-quest app with a local Express API and Ollama-powered quest generation.

## Requirements

- Node.js 20.19+ or 22.12+
- npm
- Ollama installed and running locally
- The configured Ollama model (default: `gemma4:e2b`)

The backend uses `http://127.0.0.1:11434` by default. The loopback IPv4 address avoids a localhost/IPv6 mismatch observed on Windows. Override it in the backend environment if your Ollama server uses another address.

## Start the app

Open two terminals from the repository root.

Terminal 1:

```powershell
cd backend
npm install
npm run dev
```

Terminal 2:

```powershell
cd frontend
npm install
npm run dev
```

Open the Vite URL printed in the frontend terminal (normally http://localhost:5173). Vite proxies `/api` requests to the backend on port 3001.

To configure the backend, copy `backend/.env.example` to `backend/.env` and edit values as needed:

- `PORT`: backend port (default 3001)
- `OLLAMA_BASE_URL`: local Ollama URL
- `OLLAMA_MODEL`: installed model tag (default `gemma4:e2b`)
- `OLLAMA_TIMEOUT_MS`: generation timeout (default 120000)
- `CORS_ORIGIN`: allowed frontend origin

## Tests and checks

From the repository root, run each command in its project folder:

```powershell
cd backend
npm test
```

```powershell
cd frontend
npm test
npm run lint
npm run build
```

## Journal storage

This project has no authentication or database. For this local prototype, completed quests and unique sticker IDs are saved in the browser's localStorage under `grassquest_journal`. Data is local to that browser profile and does not sync across devices or provide user isolation. Old sticker and completion keys are read once for migration.
