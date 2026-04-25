from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from models.request_models import RegisterRequest, LoginRequest
from models.database import get_db
from services.auth_service import (
    create_user, authenticate_user,
    create_access_token, get_user_by_email, get_user_by_username
)

router = APIRouter()

@router.post("/register")
def register(request: RegisterRequest, db: Session = Depends(get_db)):
    if get_user_by_email(db, request.email):
        raise HTTPException(status_code=400, detail="Email already registered")
    if get_user_by_username(db, request.username):
        raise HTTPException(status_code=400, detail="Username already taken")
    user = create_user(db, request.email, request.username, request.password)
    token = create_access_token(data={"sub": user.email})
    return {
        "access_token": token,
        "token_type": "bearer",
        "username": user.username,
        "role": "admin" if user.is_admin else "user"  # 👈 yeh add kiya
    }

@router.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = authenticate_user(db, request.email, request.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_access_token(data={"sub": user.email})
    return {
        "access_token": token,
        "token_type": "bearer",
        "username": user.username,
        "role": "admin" if user.is_admin else "user"  # 👈 yeh add kiya
    }

@router.get("/me")
def get_me(db: Session = Depends(get_db)):
    return {"message": "Protected route working!"}