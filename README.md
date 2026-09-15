# DocBrainLLM

AI-powered document workspace that lets you upload a PDF and have a grounded, source-cited conversation with it using Retrieval-Augmented Generation (RAG).

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Express%205-339933?logo=node.js&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-Python-009688?logo=fastapi&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-relational%20DB-4479A1?logo=mysql&logoColor=white)
![Qdrant](https://img.shields.io/badge/Qdrant-vector%20search-DC244C)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT%20%26%20Embeddings-412991?logo=openai&logoColor=white)

## What it does

Upload a PDF, and DocBrainLLM chunks it, embeds it, and lets you ask natural-language questions about its content. Answers are generated only from the retrieved context and come back with the page numbers they're grounded in, so you can verify every claim against the source document.

## Features

- **PDF chat** — upload a PDF and ask questions about it in natural language
- **Retrieval-Augmented Generation** — answers are grounded in the document, with page-level source citations
- **Conversation history** — each document keeps its own persisted chat thread
- **Authentication** — JWT-based auth over httpOnly cookies, bcrypt password hashing
- **Per-user AI usage limits** — monthly token budget tracked per account
- **Document management** — upload, list, and delete your own PDFs (with full cascade cleanup)

## Architecture

The app is split into three independently run services:

```
┌────────────┐      REST/JSON       ┌─────────────┐     internal API      ┌──────────────┐
│  Frontend  │ ───────────────────▶ │   Backend   │ ─────────────────────▶│  AI Service  │
│ React+Vite │ ◀─────────────────── │ Node/Express│ ◀───────────────────  │   FastAPI    │
└────────────┘     cookies/JWT      └──────┬──────┘   (shared secret)     └──────┬───────┘
                                            │                                     │
                                            ▼                                     ▼
                                        ┌────────┐                          ┌───────────┐
                                        │ MySQL  │                          │  Qdrant   │
                                        │ (data) │                          │ (vectors) │
                                        └────────┘                          └─────┬─────┘
                                                                                   │
                                                                                   ▼
                                                                             ┌───────────┐
                                                                             │  OpenAI   │
                                                                             │ Embeddings│
                                                                             │  + LLM    │
                                                                             └───────────┘
```

- **Frontend** (`frontend/`) — React 19 + Tailwind CSS 4 SPA. Handles auth screens, the document workspace, and chat UI.
- **Backend** (`backend/`) — Node.js/Express API. Owns auth, document/conversation ownership, rate limiting, and usage accounting in MySQL. It's the only service the frontend talks to directly.
- **AI Service** (`ai-service/`) — Python/FastAPI service. Extracts text from PDFs, chunks and embeds it, stores vectors in a local Qdrant instance, and answers questions via OpenAI, returning page-cited answers. It only accepts requests carrying a shared internal secret from the backend.

## Tech stack

| Layer      | Stack |
|------------|-------|
| Frontend   | React 19, React Router, Tailwind CSS 4, Vite |
| Backend    | Node.js, Express 5, MySQL (`mysql2`), JWT, bcrypt, Zod |
| AI Service | Python, FastAPI, PyMuPDF, Qdrant, OpenAI (`text-embedding-3-small`, GPT) |
| Storage    | MySQL (users/documents/conversations), Qdrant (embeddings) |

## Project structure

```
DocBrainLLM/
├── frontend/          # React SPA
│   └── src/
│       ├── pages/         # Landing, Login, Register, Dashboard, PdfWorkspace
│       ├── components/    # layout, auth, pdf, landing components
│       └── services/api.js
├── backend/           # Express API
│   └── src/
│       ├── routes/        # auth, documents, conversations, chat
│       ├── controllers/
│       ├── services/       # DB access, AI-service client, auth, usage tracking
│       └── middleware/     # JWT auth, rate limiting
└── ai-service/        # FastAPI RAG service
    └── app/
        ├── main.py         # upload & ask endpoints
        └── services/       # document parsing, chunking, embedding, retrieval, generation, vector store
```

## Getting started

### Prerequisites

- Node.js 18+
- Python 3.11+
- A running MySQL server
- An [OpenAI API key](https://platform.openai.com/api-keys)

### 1. Database

Create a MySQL database and the following tables before starting the backend (no migration file is checked in yet):

- `users` (id, name, email, password_hash, role, ...)
- `documents` (id, user_id, original_name, stored_name, file_path, created_at)
- `conversations` (id, user_id, document_id, title, created_at, updated_at)
- `chat_messages` (id, conversation_id, document_id, role, content, created_at)
- `user_ai_usage` (user_id, used_tokens, monthly_limit, period_start)

### 2. AI Service

```bash
cd ai-service
pip install fastapi uvicorn python-dotenv openai pymupdf qdrant-client python-multipart
```

Create `ai-service/.env`:

```
OPENAI_API_KEY=
INTERNAL_API_SECRET=
```

Run it:

```bash
uvicorn app.main:app --reload --port 8000
```

### 3. Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```
PORT=3000
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_PORT=
AI_SERVICE_URL=http://127.0.0.1:8000
INTERNAL_API_SECRET=
JWT_SECRET=
JWT_EXPIRES_IN=1d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

> `INTERNAL_API_SECRET` must be the same value in both `backend/.env` and `ai-service/.env` — it authenticates backend → AI service calls. `JWT_SECRET` should be a random string of at least 32 characters.

Run it:

```bash
npm run dev
```

### 4. Frontend

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## API overview

All backend routes are prefixed with `/api` and use httpOnly cookie auth (`authenticate` middleware) unless noted.

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/register` | Create an account |
| POST | `/api/auth/login` | Log in, sets auth cookie |
| POST | `/api/auth/logout` | Clear auth cookie |
| GET  | `/api/auth/me` | Current user |
| GET  | `/api/documents` | List your documents |
| POST | `/api/documents/upload` | Upload a PDF |
| GET  | `/api/documents/:id` | Get a document |
| DELETE | `/api/documents/:id` | Delete a document and its conversations |
| POST | `/api/conversations` | Start a conversation for a document |
| GET  | `/api/conversations/:id` | Get a conversation |
| GET  | `/api/conversations/:id/messages` | Get conversation history |
| GET  | `/api/conversations/document/:documentId` | Get the conversation for a document |
| POST | `/api/documents/:documentId/chat` | Ask a question about a document |

## Security notes

- Passwords are hashed with bcrypt; JWTs are signed with a pinned algorithm (`HS256`) and stored in httpOnly, `sameSite=lax` cookies.
- Every document/conversation/message lookup is scoped to the authenticated user (no cross-account access).
- Auth endpoints are rate-limited; uploads are restricted by MIME type and size.
- The AI service only accepts requests carrying a shared `X-Internal-Api-Key` secret, so it can't be queried directly without going through the backend's ownership checks.

## Status

This is an active work in progress. A few UI entry points (general chat, image OCR) exist as scaffolding on the frontend but their backend endpoints aren't implemented yet.
