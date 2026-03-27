# 🚀 CEO Premium: Executive CV Wizard

A high-fidelity, professional CV generation platform designed for executives, technical leads, and creative directors. This platform combines a modern Next.js 15 frontend with a robust FastAPI backend engine to deliver pixel-perfect, A4-native CVs.

## ✨ Features

- **Master Template Library**: 5 high-fidelity, executive-grade templates (CEO Premium, Executive Sidebar, Modern Full Sidebar, Tech Clean, UX Split).
- **A4 Precision Engine**: 1:1 visual parity between frontend previews and backend-rendered PDFs.
- **AI-Powered Analysis**: Deep CV parsing and strategic recommendations based on target job roles.
- **ATS-Ready Architectures**: Optimized layouts for maximum compatibility with recruitment software.
- **FastAPI Backend**: High-performance engine for PDF/DOCX export and AI coordination.

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, Tailwind CSS 4, Framer Motion, Lucide React.
- **Backend**: FastAPI, Jinja2, PyMuPDF, Python-docx.
- **Database/Auth**: Supabase (PostgreSQL).
- **AI Integration**: DeepSeek / SiliconFlow via AI Coordinator.

## 📦 Getting Started

### 1. Prerequisites
- Node.js 18+
- Python 3.9+

### 2. Implementation

#### Frontend
```bash
# Navigate to root
npm install
npm run dev
```

#### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## 🌐 Environment Variables

### Frontend (`.env.local`)
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase Anon Key
- `NEXT_PUBLIC_API_URL`: URL of the FastAPI backend (e.g., `http://127.0.0.1:8000`)

### Backend (`backend/.env`)
- `SILICONFLOW_API_KEY`: API Key for AI services
- `SUPABASE_URL`: Supabase URL
- `SUPABASE_KEY`: Supabase Key

## 🚀 Deployment

### Frontend (Vercel)
1. Push the code to GitHub.
2. Link the repository in Vercel.
3. Configure the environment variables in the Vercel dashboard.

### Backend (Render / Railway / DigitalOcean)
1. Deploy the `backend` directory.
2. Ensure `requirements.txt` is detected.
3. Set the `CORS` origins in `app/main.py` if needed.

---
© 2026 CEO Premium Platform. All rights reserved.
