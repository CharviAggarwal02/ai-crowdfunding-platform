from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from pydantic import BaseModel

from app.db import get_db
from app.models.investment import Investment
from app.models.user import User
from app.models.startup import Startup
from app.services.blockchain_service import create_transaction_hash

router = APIRouter(prefix="/api", tags=["Investment"])


# ---------------- REQUEST MODEL ---------------- #

class InvestRequest(BaseModel):
    startup_id: int
    investor_id: int
    amount: float


# ---------------- INVEST ROUTE ---------------- #

@router.post("/invest")
def invest(payload: InvestRequest, db: Session = Depends(get_db)):

    if payload.amount <= 0:
        raise HTTPException(status_code=400, detail="Invalid amount")

    # Check user exists
    user = db.query(User).filter(User.id == payload.investor_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="Investor not found")

    # Check startup exists
    startup = db.query(Startup).filter(Startup.id == payload.startup_id).first()

    if not startup:
        raise HTTPException(status_code=404, detail="Startup not found")

    # Save investment
    new_investment = Investment(
        startup_id=payload.startup_id,
        investor_id=payload.investor_id,
        amount=payload.amount
    )

    db.add(new_investment)

    # Update startup funding
    startup.currentFunding += payload.amount

    db.commit()
    db.refresh(new_investment)

    # Blockchain Hash
    tx_hash = create_transaction_hash({
        "startup_id": payload.startup_id,
        "investor_id": payload.investor_id,
        "amount": payload.amount
    })

    return {
        "message": "Investment successful",
        "investment_id": new_investment.id,
        "blockchain_hash": tx_hash
    }     

@router.get("/investments/{investor_id}")
def get_my_investments(investor_id: int, db: Session = Depends(get_db)):

    investments = db.query(Investment).filter(
        Investment.investor_id == investor_id
    ).all()

    result = []

    for inv in investments:
        startup = db.query(Startup).filter(
            Startup.id == inv.startup_id
        ).first()

        if startup:
            result.append({
                "id": inv.id,
                "amount": inv.amount,
                "date": inv.created_at,
                "startup": {
                    "id": startup.id,
                    "name": startup.name,
                    "description": startup.description,
                    "fundingGoal": startup.fundingGoal,
                    "currentFunding": startup.currentFunding
                }
            })

    return result


@router.get("/investors/{startup_id}")
def get_investors_for_startup(startup_id: int, db: Session = Depends(get_db)):
    """Get all investors who invested in a specific startup"""
    
    investments = db.query(Investment).filter(
        Investment.startup_id == startup_id
    ).all()

    result = []

    for inv in investments:
        user = db.query(User).filter(User.id == inv.investor_id).first()

        if user:
            result.append({
                "id": user.id,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "email": user.email,
                "amount": inv.amount,
                "investmentDate": inv.created_at
            })

    return result