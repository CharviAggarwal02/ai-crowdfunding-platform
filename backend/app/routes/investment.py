from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db import get_db
from app.models.investment import Investment
from app.services.blockchain_service import create_transaction_hash

router = APIRouter()

@router.post("/invest")

def invest(startup_id:int, investor_id:int, amount:float, db:Session=Depends(get_db)):

    investment = Investment(
        startup_id=startup_id,
        investor_id=investor_id,
        amount=amount
    )

    db.add(investment)
    db.commit()
    db.refresh(investment)

    tx_hash = create_transaction_hash({
        "startup": startup_id,
        "investor": investor_id,
        "amount": amount
    })

    return {
        "investment": investment.id,
        "blockchain_hash": tx_hash
    }