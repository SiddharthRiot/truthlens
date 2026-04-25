from fastapi import APIRouter
from services.news_service import get_related_articles

router = APIRouter()

@router.get("/news")
async def get_news(query: str):
    articles = await get_related_articles(query)
    return {
        "success": True,
        "articles": articles
    }