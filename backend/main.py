from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import analyze, news
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Fake News Detector API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analyze.router, prefix="/api")
app.include_router(news.router, prefix="/api")

@app.get("/")
def root():
    return {"message": "Fake News Detector API is running!"}