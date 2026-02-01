@echo off
echo Starting Patent RAG System...

echo Starting Backend (FastAPI)...
start "Backend" cmd /k "cd backend && pip install -r requirements.txt && uvicorn main:app --reload --port 8000"

echo Starting Frontend (React)...
start "Frontend" cmd /k "cd patent-app && npm run dev"

echo System Started.
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5173
pause
