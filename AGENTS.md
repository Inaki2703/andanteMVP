# AGENTS.md

## Cursor Cloud specific instructions

Andante is a **client-only** Vite + React 19 + TypeScript app (a digital art gallery MVP). There is no backend, database, or test suite — all data is mocked in memory in `src/data.ts`.

- **Single service:** the Vite dev server. Run `npm run dev` (serves on `http://localhost:3000`, host `0.0.0.0`; override with `PORT`). Standard scripts live in `package.json`.
- **Lint / typecheck:** `npm run lint` (runs `tsc --noEmit`). **Build:** `npm run build`. There is **no test runner** — `npm test` does not exist.
- **Env vars are optional.** `GEMINI_API_KEY` / `APP_URL` in `.env.example` are declared for future use only and are not wired into any code; the app runs fully without a `.env` file.
- The declared `express`, `@google/genai`, and `dotenv` dependencies are unused (no imports in `src/`); there is no server process despite `clean` referencing `server.js`.
