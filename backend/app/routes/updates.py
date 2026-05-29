from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..db import get_db
from ..models.update import Update

router = APIRouter(prefix="/api/updates", tags=["Updates"])

# POST UPDATE
@router.post("/")
def create_update(data: dict, db: Session = Depends(get_db)):

    new_update = Update(
        campaign_id = data["campaign_id"],
        title = data["title"],
        content = data["content"]
    )

    db.add(new_update)
    db.commit()
    db.refresh(new_update)

    return new_update


# GET CAMPAIGN UPDATES
@router.get("/{campaign_id}")
def get_updates(campaign_id: int, db: Session = Depends(get_db)):

    updates = db.query(Update)\
        .filter(Update.campaign_id == campaign_id)\
        .order_by(Update.created_at.desc())\
        .all()

    return updates


# DELETE UPDATE
@router.delete("/{id}")
def delete_update(id: int, db: Session = Depends(get_db)):

    upd = db.query(Update).get(id)
    db.delete(upd)
    db.commit()

    return {"message": "Deleted"}