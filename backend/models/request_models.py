from pydantic import BaseModel, EmailStr

class NewsRequest(BaseModel):
    text: str

class RegisterRequest(BaseModel):
    email: str
    username: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    username: str