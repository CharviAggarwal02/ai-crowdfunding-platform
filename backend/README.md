# UpFund Backend (FastAPI + MongoDB)

## Prerequisites
- Python 3.10+
- MongoDB running (local or Atlas)

## Setup
1. Create virtual env and install deps:
```bash
python -m venv .venv
. .venv/Scripts/activate  # Windows PowerShell: .venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

2. Configure environment:
- Copy `.env.example` to `.env` and edit values.

3. Run server:
```bash
uvicorn app.main:app --reload --port 8000
```

## Env
- MONGODB_URI: Mongo connection string
- DB_NAME: Database name (default: upfund)
- JWT_SECRET: Secret for token signing (placeholder for future)
- ALLOWED_ORIGINS: Comma-separated origins for CORS

## API
- POST `/api/auth/signup` → Create user account

