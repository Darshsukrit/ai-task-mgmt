ContextOS backend (FastAPI)

Run (development):

1. Create a Python virtualenv and install requirements:

```bash
python -m venv .venv
source .venv/bin/activate  # or .venv\Scripts\activate on Windows
pip install -r requirements.txt
```

2. Configure `.env` with your MySQL `DATABASE_URL` and `SECRET_KEY`.

3. Start the app:

```bash
uvicorn app.main:app --reload --port 8000
```
