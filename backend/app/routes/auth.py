from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from datetime import datetime, timedelta
import jwt

from ..db import get_db
from ..models.user import User
from ..schemas.user import UserCreate, UserLogin, UserPublic

SECRET_KEY = "supersecretkey"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

router = APIRouter(prefix="/api/auth", tags=["Auth"])

# ✅ Use Argon2 instead of bcrypt
pwd = CryptContext(schemes=["argon2"], deprecated="auto")


# ---------------- TOKEN ---------------- #

def create_access_token(user_id: int):
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    payload = {
        "sub": str(user_id),
        "exp": expire
    }

    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


# ---------------- SIGNUP ---------------- #

@router.post("/signup", response_model=UserPublic)
def signup(payload: UserCreate, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(User.email == payload.email).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    password = payload.password.strip()

    # Optional password validation
    if len(password) < 6:
        raise HTTPException(
            status_code=400,
            detail="Password must be at least 6 characters"
        )

    hashed_password = pwd.hash(password)

    new_user = User(
        firstName=payload.firstName,
        lastName=payload.lastName,
        email=payload.email,
        passwordHash=hashed_password,
        role=payload.role,
        created_at=datetime.utcnow()
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


# ---------------- LOGIN ---------------- #

@router.post("/login")
def login(payload: UserLogin, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.email == payload.email).first()

    if not user:
        raise HTTPException(status_code=401, detail="Invalid email")

    if not pwd.verify(payload.password.strip(), user.passwordHash):
        raise HTTPException(status_code=401, detail="Invalid password")

    token = create_access_token(user.id)

    return {
        "accessToken": token,
        "user": {
            "id": user.id,
            "firstName": user.firstName,
            "lastName": user.lastName,
            "email": user.email,
            "role": user.role
        }
    }