from fastapi import APIRouter, HTTPException, Depends, Request
from sqlalchemy.orm import Session
from models.request_models import NewsRequest
from models.database import get_db
from models.analysis import Analysis
from services.groq_service import analyze_news
from services.news_service import get_related_articles
from services.auth_service import verify_token
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Optional

router = APIRouter()
security = HTTPBearer(auto_error=False)

@router.post("/analyze")
async def analyze(
    request: NewsRequest,
    db: Session = Depends(get_db),
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)
):
    try:
        analysis = analyze_news(request.text)

        # User ID nikalo agar logged in hai
        user_id = None
        if credentials:
            email = verify_token(credentials.credentials)
            if email:
                from models.user import User
                user = db.query(User).filter(User.email == email).first()
                if user:
                    user_id = user.id

        # Database mein save karo
        db_analysis = Analysis(
            user_id=user_id,
            input_text=request.text,
            trust_score=analysis["trust_score"],
            verdict=analysis["verdict"],
            verdict_color=analysis["verdict_color"],
            bias_level=analysis["bias_level"],
            emotional_language=analysis["emotional_language"],
            clickbait=analysis["clickbait"],
            summary=analysis["summary"],
        )
        db.add(db_analysis)
        db.commit()

        first_words = " ".join(request.text.split()[:5])
        related = await get_related_articles(first_words)

        return {
            "success": True,
            "analysis": analysis,
            "related_articles": related
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))