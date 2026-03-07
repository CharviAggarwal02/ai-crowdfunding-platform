from sqlalchemy import Column,Integer,Float,ForeignKey,DateTime
from sqlalchemy.sql import func
from app.db import Base

class Investment(Base):

    __tablename__="investments"

    id=Column(Integer,primary_key=True)

    startup_id=Column(Integer,ForeignKey("startups.id"))

    investor_id=Column(Integer,ForeignKey("users.id"))

    amount=Column(Float)

    created_at=Column(DateTime,server_default=func.now())