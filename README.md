# Manju Pappuru Portfolio

A React frontend backed by a layered Spring Boot API.

## Backend

From the project root:

```powershell
.\mvnw.cmd spring-boot:run
```

The backend runs at `http://localhost:8081`. H2 file storage is the default for local development. Configure a different datasource through the variables in `.env.example`.

## Frontend

From `frontend/`:

```powershell
npm install
npm run dev
```

The frontend runs at `http://localhost:5173` and uses `VITE_API_URL` when provided. If the backend is unavailable, project cards use the static portfolio data fallback.

## API

- `GET /api/projects`
- `GET /api/projects/{id}`
- `POST /api/contact`
- `POST /api/ai/chat`

The AI endpoint is intentionally portfolio-scoped and does not call an external provider or expose an API key.
