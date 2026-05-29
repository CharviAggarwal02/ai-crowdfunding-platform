from sqlalchemy import Column, Integer, Float, ForeignKey, DateTime
from datetime import datetime
from app.db import Base

class Investment(Base):
    __tablename__ = "investments"

    id = Column(Integer, primary_key=True, index=True)

    startup_id = Column(Integer, ForeignKey("startups.id"))
    investor_id = Column(Integer, ForeignKey("users.id"))

    amount = Column(Float, nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow)