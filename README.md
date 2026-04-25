# 🔍 TruthLens — AI Fake News Detector

> An AI-powered fake news detection tool that analyzes news articles and WhatsApp forwards in Hindi & English.

![TruthLens](https://img.shields.io/badge/TruthLens-AI%20Powered-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green)
![React](https://img.shields.io/badge/React-TSX-blue)
![Groq](https://img.shields.io/badge/Groq-LLaMA%203-orange)

---

## 🚀 Features

- ✅ AI-powered fake news detection (Hindi, English & more languages)
- ✅ Trust score (0-100) with detailed breakdown
- ✅ Bias, emotional language & clickbait detection
- ✅ Related verified articles via NewsAPI
- ✅ Share results directly on WhatsApp
- ✅ Search history with localStorage
- ✅ Session stats & analytics

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + TypeScript + Tailwind CSS |
| Backend | Python + FastAPI |
| AI Model | Groq (LLaMA 3.3 70B) |
| News API | NewsAPI.org |
| Font | Plus Jakarta Sans |

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js 18+
- Python 3.10+
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

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repo
2. Create your branch: git checkout -b feature/your-feature
3. Commit changes: git commit -m "add: your feature"
4. Push: git push origin feature/your-feature
5. Open a Pull Request

### Areas where you can contribute

- [ ] User authentication system (JWT)
- [ ] PostgreSQL database integration
- [ ] Admin dashboard
- [ ] URL scraping feature
- [ ] Mobile responsive UI improvements
- [ ] Multi-language support (Hindi, Bengali, Tamil, Telugu, Marathi, Punjabi, and more)
- [ ] Docker setup
- [ ] Deploy to cloud (Vercel + Render)

---

## 📄 License

Apache 2.0 — feel free to use and modify!

---

Made with ❤️ by [SiddharthRiot](https://github.com/SiddharthRiot)