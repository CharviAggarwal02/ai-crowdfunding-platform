from pydantic import BaseModel, EmailStr
from typing import Optional
from enum import Enum


class UserRole(str, Enum):
    investor = "investor"
    entrepreneur = "entrepreneur"
    admin = "admin"


class UserCreate(BaseModel):
    firstName: Optional[str] = None
    lastName: Optional[str] = None
    email: EmailStr
    password: str
    role: UserRole


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserPublic(BaseModel):
    id: int
    firstName: Optional[str]
    lastName: Optional[str]
    email: EmailStr
    role: str

    class Config:
        from_attributes = True