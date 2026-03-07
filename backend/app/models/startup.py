from sqlalchemy import Column,Integer,String,Float,ForeignKey,DateTime
from sqlalchemy.sql import func
from app.db import Base

class Startup(Base):

    __tablename__="startups"

    id=Column(Integer,primary_key=True)
    name=Column(String)
    category=Column(String)
    goal_amount=Column(Float)
    description=Column(String)

    owner_id=Column(Integer,ForeignKey("users.id"))

    created_at=Column(DateTime,server_default=func.now())