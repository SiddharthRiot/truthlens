from fastapi import APIRouter
from models.request_models import NewsRequest
from backend.services.groq_service import analyze_news

router = APIRouter()

@router.post("/report")
async def generate_report(request: NewsRequest):
    analysis = analyze_news(request.text)
    return {
        "success": True,
        "report": {
            "analysis": analysis,
            "generated_at": str(__import__('datetime').datetime.now()),
        }
    }