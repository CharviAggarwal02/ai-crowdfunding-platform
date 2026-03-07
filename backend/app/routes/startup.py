from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db import get_db
from app.models.startup import Startup

router = APIRouter()

@router.post("/startups")
def create_startup(name:str, category:str, goal_amount:float, db:Session=Depends(get_db)):

    startup = Startup(
        name=name,
        category=category,
        goal_amount=goal_amount
    )

    db.add(startup)
    db.commit()
    db.refresh(startup)

    return startup


@router.get("/startups")
def list_startups(db:Session=Depends(get_db)):
    return db.query(Startup).all()