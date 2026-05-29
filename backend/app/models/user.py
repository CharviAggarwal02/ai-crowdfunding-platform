from sqlalchemy import Column, Integer, String
from ..db import Base
from sqlalchemy import DateTime
from sqlalchemy.sql import func

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    firstName = Column(String, nullable=False)
    lastName = Column(String, nullable=False)
    email = Column(String, unique=True, index=True)
    role = Column(String, default="investor")
    passwordHash = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())