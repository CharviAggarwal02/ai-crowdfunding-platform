from sqlalchemy import Column, Integer, String, Float
from app.db import Base

class Startup(Base):
    __tablename__ = "startups"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)
    industry = Column(String)
    status = Column(String)

    fundingGoal = Column("funding_goal", Float, default=0)
    currentFunding = Column("current_funding", Float, default=0)

    valuation = Column(Float)
    teamSize = Column("team_size", Integer)
    equity = Column(Float)
    foundedDate = Column("founded_date", String)