from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from models.database import get_db
from models.user import User
from models.analysis import Analysis
from services.auth_service import verify_token
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

router = APIRouter()
security = HTTPBearer()

def get_admin_user(credentials: HTTPAuthorizationCredentials = Depends(security), db: Session = Depends(get_db)):
    token = credentials.credentials
    email = verify_token(token)
    if not email:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = db.query(User).filter(User.email == email).first()
    if not user or not user.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required")
    return user

@router.get("/stats")
def get_stats(db: Session = Depends(get_db), admin=Depends(get_admin_user)):
    total_users = db.query(func.count(User.id)).scalar()
    total_analyses = db.query(func.count(Analysis.id)).scalar()
    fake_count = db.query(func.count(Analysis.id)).filter(Analysis.verdict == "Fake").scalar()
    real_count = db.query(func.count(Analysis.id)).filter(Analysis.verdict == "Real").scalar()
    suspicious_count = db.query(func.count(Analysis.id)).filter(Analysis.verdict == "Suspicious").scalar()
    mostly_true_count = db.query(func.count(Analysis.id)).filter(Analysis.verdict == "Mostly True").scalar()

    return {
        "total_users": total_users,
        "total_analyses": total_analyses,
        "fake_count": fake_count,
        "real_count": real_count,
        "suspicious_count": suspicious_count,
        "mostly_true_count": mostly_true_count,
    }

@router.get("/users")
def get_users(db: Session = Depends(get_db), admin=Depends(get_admin_user)):
    users = db.query(User).order_by(User.created_at.desc()).all()
    return [{
        "id": u.id,
        "email": u.email,
        "username": u.username,
        "is_admin": u.is_admin,
        "is_active": u.is_active,
        "created_at": u.created_at,
    } for u in users]

@router.get("/analyses")
def get_analyses(db: Session = Depends(get_db), admin=Depends(get_admin_user)):
    analyses = db.query(Analysis).order_by(Analysis.created_at.desc()).limit(50).all()
    return [{
        "id": a.id,
        "user_id": a.user_id,
        "trust_score": a.trust_score,
        "verdict": a.verdict,
        "summary": a.summary,
        "created_at": a.created_at,
        "input_text": a.input_text[:100] + "...",
    } for a in analyses]

@router.post("/users/{user_id}/make-admin")
def make_admin(user_id: int, db: Session = Depends(get_db), admin=Depends(get_admin_user)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if user.is_admin:
        raise HTTPException(status_code=400, detail="User is already an admin")
    user.is_admin = True
    db.commit()
    return {"message": f"{user.username} is now an admin!"}

@router.post("/users/{user_id}/remove-admin")
def remove_admin(user_id: int, db: Session = Depends(get_db), admin=Depends(get_admin_user)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if not user.is_admin:
        raise HTTPException(status_code=400, detail="User is not an admin")
    if user.id == admin.id:
        raise HTTPException(status_code=400, detail="You cannot remove your own admin access")
    user.is_admin = False
    db.commit()
    return {"message": f"{user.username} admin access removed!"}