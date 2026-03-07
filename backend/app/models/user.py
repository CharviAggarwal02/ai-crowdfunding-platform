from pydantic import BaseModel, EmailStr, Field
from typing import Optional, Literal

class UserBase(BaseModel):
    firstName: str = Field(min_length=1)
    lastName: str = Field(min_length=1)
    email: EmailStr
    role: Literal["investor", "startup", "admin"] = "investor"

class UserCreate(UserBase):
    password: str = Field(min_length=6)

class UserInDB(UserBase):
    id: Optional[str] = None
    passwordHash: str

class UserPublic(UserBase):
    id: str

