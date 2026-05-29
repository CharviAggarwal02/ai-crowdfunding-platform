from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from ..db import get_db
from ..models.user import User

router = APIRouter(prefix="/api/admin", tags=["Admin"])


@router.get("/users")
def get_users(db: Session = Depends(get_db)):

    users = db.query(User).all()

    print("⭐⭐⭐⭐ TOTAL USERS FROM DB:", len(users))

    for u in users:
        print("USER:", u.id, u.email, u.role, u.created_at)

    entrepreneurs = []
    investors = []

    for u in users:
        role_value = str(u.role)

        user_data = {
            "id": u.id,
            "name": f"{u.firstName} {u.lastName}",
            "email": u.email,
            "role": role_value,
            "created_at": u.created_at.isoformat() if u.created_at else None
        }

        if "entrepreneur" in role_value:
            entrepreneurs.append(user_data)

        elif "investor" in role_value:
            investors.append(user_data)

    return {
        "entrepreneurs": entrepreneurs,
        "investors": investors
    }

@router.get("/growth")
def growth(db: Session = Depends(get_db)):

    data = (
        db.query(
            func.date(User.created_at).label("date"),
            func.count(User.id).label("count"),
            User.role
        )
        .group_by(func.date(User.created_at), User.role)
        .order_by(func.date(User.created_at))
        .all()
    )

    result = {}

    for date, count, role in data:

        role_value = str(role)

        if date not in result:
            result[date] = {
                "label": str(date),
                "entrepreneurs": 0,
                "investors": 0
            }

        if "entrepreneur" in role_value:
            result[date]["entrepreneurs"] = count

        elif "investor" in role_value:
            result[date]["investors"] = count

    return list(result.values())