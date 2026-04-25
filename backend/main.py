from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import analyze, news, auth
from dotenv import load_dotenv
from models.database import Base, engine
from routers import analyze, news, auth, admin, user

load_dotenv()

Base.metadata.create_all(bind=engine)

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
app.include_router(auth.router, prefix="/api/auth")
app.include_router(admin.router, prefix="/api/admin")
app.include_router(user.router, prefix="/api/user")

@app.get("/")
def root():
    return {"message": "Fake News Detector API is running!"}