from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from database import SessionLocal
from models import User
from auth import password_hash, verify_password, create_access_token, decode_access_token
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/auth", tags=["auth"])

# ----------------------
# Dependency: get DB session
# ----------------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ----------------------
# Pydantic models
# ----------------------
class RegisterRequest(BaseModel):
    username: str
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

# ----------------------
# Register endpoint
# ----------------------
@router.post("/register")
def register(data: RegisterRequest, db: Session = Depends(get_db)):
    # Check if username or email already exists
    existing_user = db.query(User).filter(
        (User.username == data.username) | (User.email == data.email)
    ).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")
    
    hashed = password_hash(data.password)
    user = User(username=data.username, email=data.email, password=hashed)
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"message": "User registered successfully", "user_id": user.id}

# ----------------------
# Login endpoint
# ----------------------
@router.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    # Query by email
    user = db.query(User).filter(User.email == data.email).first()
    if not user or not verify_password(data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Generate token and save to database
    token = create_access_token({"sub": user.username, "user_id": user.id})
    user.token = token
    db.commit()
    
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email
        }
    }

# ----------------------
# Token verification dependency
# ----------------------
def verify_token(authorization: Optional[str] = Header(None), db: Session = Depends(get_db)):
    """Verify token from database and return user"""
    if not authorization:
        raise HTTPException(status_code=401, detail="No authorization token provided")
    
    # Extract token from "Bearer <token>"
    try:
        scheme, token = authorization.split()
        if scheme.lower() != "bearer":
            raise HTTPException(status_code=401, detail="Invalid authentication scheme")
    except ValueError:
        raise HTTPException(status_code=401, detail="Invalid authorization header")
    
    # Check if token exists in database
    user = db.query(User).filter(User.token == token).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    
    # Verify token is valid
    payload = decode_access_token(token)
    if not payload:
        # Token is invalid, clear it from database
        user.token = None
        db.commit()
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    
    return user

# ----------------------
# Logout endpoint
# ----------------------
@router.post("/logout")
def logout(user: User = Depends(verify_token), db: Session = Depends(get_db)):
    """Clear user token from database"""
    user.token = None
    db.commit()
    return {"message": "Logged out successfully"}

# ----------------------
# Verify token endpoint (check if user is authenticated)
# ----------------------
@router.get("/verify")
def verify_user(user: User = Depends(verify_token)):
    """Verify if token is valid and return user info"""
    return {
        "authenticated": True,
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email
        }
    }
