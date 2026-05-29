# app/routes/messages.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

from ..db import get_db
from ..models.message import Message

router = APIRouter(prefix="/api/messages", tags=["messages"])

# ── Pydantic schemas ──────────────────────────────────────────

class MessageCreate(BaseModel):
    startup_id: int
    sender: str        # "investor" or "entrepreneur"
    name: str
    message: str
    avatar: Optional[str] = None

class MessageOut(BaseModel):
    id: int
    startup_id: int
    sender: str
    name: str
    message: str
    avatar: Optional[str]
    timestamp: datetime

    class Config:
        from_attributes = True

# ── GET all messages for a startup ───────────────────────────

@router.get("/{startup_id}", response_model=list[MessageOut])
def get_messages(startup_id: int, db: Session = Depends(get_db)):
    messages = (
        db.query(Message)
        .filter(Message.startup_id == startup_id)
        .order_by(Message.timestamp.asc())
        .all()
    )
    return messages

# ── POST a new message ────────────────────────────────────────

@router.post("/", response_model=MessageOut)
def create_message(payload: MessageCreate, db: Session = Depends(get_db)):
    msg = Message(
        startup_id = payload.startup_id,
        sender     = payload.sender,
        name       = payload.name,
        message    = payload.message,
        avatar     = payload.avatar,
    )
    db.add(msg)
    db.commit()
    db.refresh(msg)
    return msg

# ── DELETE all messages for a startup (optional/utility) ─────

@router.delete("/{startup_id}")
def delete_messages(startup_id: int, db: Session = Depends(get_db)):
    db.query(Message).filter(Message.startup_id == startup_id).delete()
    db.commit()
    return {"detail": "Messages deleted"}