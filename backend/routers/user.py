from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.database import get_db
from models.user import User
from models.analysis import Analysis
from services.auth_service import verify_token
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

router = APIRouter()
security = HTTPBearer()

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security), db: Session = Depends(get_db)):
    token = credentials.credentials
    email = verify_token(token)
    if not email:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.get("/profile")
def get_profile(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "email": current_user.email,
        "username": current_user.username,
        "is_admin": current_user.is_admin,
        "created_at": current_user.created_at,
    }

@router.get("/stats")
def get_user_stats(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    analyses = db.query(Analysis).filter(Analysis.user_id == current_user.id).all()
    total = len(analyses)
    fake = sum(1 for a in analyses if a.verdict == "Fake")
    real = sum(1 for a in analyses if a.verdict == "Real")
    suspicious = sum(1 for a in analyses if a.verdict == "Suspicious")
    mostly_true = sum(1 for a in analyses if a.verdict == "Mostly True")
    avg_score = round(sum(a.trust_score for a in analyses) / total, 1) if total > 0 else 0

    return {
        "total": total,
        "fake": fake,
        "real": real,
        "suspicious": suspicious,
        "mostly_true": mostly_true,
        "avg_trust_score": avg_score,
    }

@router.get("/history")
def get_history(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    analyses = db.query(Analysis).filter(
        Analysis.user_id == current_user.id
    ).order_by(Analysis.created_at.desc()).limit(20).all()
    return [{
        "id": a.id,
        "trust_score": a.trust_score,
        "verdict": a.verdict,
        "verdict_color": a.verdict_color,
        "bias_level": a.bias_level,
        "emotional_language": a.emotional_language,
        "clickbait": a.clickbait,
        "summary": a.summary,
        "input_text": a.input_text[:120] + "..." if len(a.input_text) > 120 else a.input_text,
        "created_at": a.created_at,
    } for a in analyses]