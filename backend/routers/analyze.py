from fastapi import APIRouter, HTTPException
from models.request_models import NewsRequest
from services.groq_service import analyze_news
from services.news_service import get_related_articles

router = APIRouter()

@router.post("/analyze")
async def analyze(request: NewsRequest):
    try:
        analysis = analyze_news(request.text)
        
        first_words = " ".join(request.text.split()[:5])
        related = await get_related_articles(first_words)
        
        return {
            "success": True,
            "analysis": analysis,
            "related_articles": related
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))