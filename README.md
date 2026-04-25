# 🔍 TruthLens — AI Fake News Detector

> An AI-powered fake news detection tool that analyzes news articles and WhatsApp forwards in Hindi & English.

![TruthLens](https://img.shields.io/badge/TruthLens-AI%20Powered-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green)
![React](https://img.shields.io/badge/React-TSX-blue)
![Groq](https://img.shields.io/badge/Groq-LLaMA%203-orange)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)
![JWT](https://img.shields.io/badge/JWT-Auth-yellow)

---

## 🚀 Features

- ✅ AI-powered fake news detection (Hindi, English, Bengali, Tamil, Marathi, Urdu & more)
- ✅ Trust score (0-100) with detailed breakdown
- ✅ Bias, emotional language & clickbait detection
- ✅ Related verified articles via NewsAPI
- ✅ Share results directly on WhatsApp
- ✅ JWT-based authentication (signup, login, protected routes)
- ✅ Hashed passwords with bcrypt
- ✅ User dashboard — analysis history, stats, profile
- ✅ Admin dashboard — platform stats, user management, verdict distribution
- ✅ Role-based access control (admin / user)
- ✅ PostgreSQL integration for storing users & analysis logs
- ✅ CI/CD pipeline with GitHub Actions
---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + TypeScript + Tailwind CSS |
| Backend | Python + FastAPI |
| AI Model | Groq (LLaMA 3.3 70B) |
| Database | PostgreSQL + SQLAlchemy |
| Auth | JWT (python-jose) + bcrypt |
| News API | NewsAPI.org |
| CI/CD | GitHub Actions |
| Font | Plus Jakarta Sans |

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js 18+
- Python 3.10+
- PostgreSQL
- Git

### 1. Clone the repo

    git clone https://github.com/SiddharthRiot/truthlens.git
    cd truthlens

### 2. Backend Setup

    cd backend
    python -m venv venv
    venv\Scripts\activate
    pip install -r requirements.txt

Create `.env` file in `backend/` folder:

    GROQ_API_KEY=your_groq_api_key_here
    NEWS_API_KEY=your_newsapi_key_here
    DATABASE_URL=postgresql://username:password@localhost:5432/truthlens
    SECRET_KEY=your_secret_key_here

Get your free API keys:
- Groq API → https://console.groq.com
- NewsAPI → https://newsapi.org

Run backend:

    uvicorn main:app --reload

Backend runs on → http://localhost:8000

### 3. Frontend Setup

    cd frontend
    npm install
    npm start

Frontend runs on → http://localhost:3000

---

## 🔑 Environment Variables

| Variable | Where to get |
|----------|-------------|
| GROQ_API_KEY | https://console.groq.com |
| NEWS_API_KEY | https://newsapi.org |
| DATABASE_URL | Your PostgreSQL connection string |
| SECRET_KEY | Any random secret string |

---

## 🔐 Auth & Roles

- Users can register and login via JWT-based auth
- Passwords are hashed with bcrypt
- Roles: `user` (default) and `admin`
- Admin can promote/demote users from the dashboard
- All private routes are protected via Bearer token

---

## 📊 Dashboards

### User Dashboard
- Personal analysis history (last 20)
- Stats: total analyses, avg trust score, fake/real/suspicious count
- Profile info with member since date

### Admin Dashboard
- Platform-wide stats: total users, total analyses, verdict distribution
- User management: view all users, make/remove admin
- Recent analyses log (last 50)

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repo
2. Create your branch: git checkout -b feature/your-feature
3. Commit changes: git commit -m "add: your feature"
4. Push: git push origin feature/your-feature
5. Open a Pull Request

---

## 📄 License

Apache 2.0 — feel free to use and modify!

---

Made with ❤️ using AI to bring trust back to information.