from fastapi import APIRouter, HTTPException, Header
from typing import Optional
import sqlite3
import os
import jwt  # pip install python-jose or PyJWT

router = APIRouter(prefix="/api/startups", tags=["Startups"])

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB = os.path.join(BASE_DIR, "../../upfund.db")

# ⚠️ Use the same secret your auth router uses
JWT_SECRET = "supersecretkey"
JWT_ALGORITHM = "HS256"


# ---------- HELPER: decode token ----------
def get_user_id_from_token(authorization: Optional[str]) -> Optional[int]:
    """Extract user_id from Bearer token. Returns None if missing/invalid."""
    if not authorization or not authorization.startswith("Bearer "):
        return None
    token = authorization.split(" ", 1)[1]
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload.get("user_id") or payload.get("id") or payload.get("sub")
    except Exception:
        return None


# ---------- INIT DB ----------
def init_db():
    conn = sqlite3.connect(DB)
    c = conn.cursor()

    c.execute("""
    CREATE TABLE IF NOT EXISTS startups (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT,
        industry TEXT,
        status TEXT,
        funding_goal REAL,
        valuation REAL,
        team_size INTEGER,
        equity REAL,
        founded_date TEXT,
        current_funding REAL DEFAULT 0,
        owner_id INTEGER          -- ✅ NEW: links startup to entrepreneur
    )
    """)

    # ✅ Add owner_id column if it doesn't exist yet (safe migration)
    try:
        c.execute("ALTER TABLE startups ADD COLUMN owner_id INTEGER")
        conn.commit()
    except sqlite3.OperationalError:
        pass  # Column already exists, ignore

    conn.commit()
    conn.close()


init_db()


# ---------- GET ALL ----------
@router.get("/")
def get_startups():
    conn = sqlite3.connect(DB)
    c = conn.cursor()

    c.execute("SELECT * FROM startups ORDER BY id DESC")
    rows = c.fetchall()

    conn.close()

    startups = []

    for row in rows:
        startups.append({
            "id": row[0],
            "name": row[1],
            "description": row[2],
            "industry": row[3],
            "status": row[4],
            "fundingGoal": row[5],
            "valuation": row[6],
            "teamSize": row[7],
            "equity": row[8],
            "foundedDate": row[9],
            "currentFunding": row[10],
            "fundingProgress": (
                (row[10] / row[5]) * 100 if row[5] and row[10] else 0
            )
        })

    return startups


# ✅ NEW: GET STARTUPS FOR THE LOGGED-IN ENTREPRENEUR
# IMPORTANT: This route MUST come before "/{id}" to avoid being matched as id="my"
@router.get("/my")
def get_my_startups(authorization: Optional[str] = Header(None)):
    user_id = get_user_id_from_token(authorization)

    if not user_id:
        raise HTTPException(status_code=401, detail="Unauthorized")

    conn = sqlite3.connect(DB)
    c = conn.cursor()

    c.execute("SELECT * FROM startups WHERE owner_id = ? ORDER BY id DESC", (user_id,))
    rows = c.fetchall()

    conn.close()

    if not rows:
        raise HTTPException(status_code=404, detail="No startups found for this user")

    # Return list of startups (frontend picks the first one)
    return [
        {
            "id": row[0],
            "name": row[1],
            "description": row[2],
            "industry": row[3],
            "status": row[4],
            "fundingGoal": row[5],
            "valuation": row[6],
            "teamSize": row[7],
            "equity": row[8],
            "foundedDate": row[9],
            "currentFunding": row[10],
            "owner_id": row[11]
        }
        for row in rows
    ]


# ---------- CREATE ----------
@router.post("/")
def create_startup(data: dict, authorization: Optional[str] = Header(None)):
    # ✅ Extract owner from token so we know which entrepreneur owns this startup
    user_id = get_user_id_from_token(authorization)

    try:
        conn = sqlite3.connect(DB)
        c = conn.cursor()

        c.execute("""
        INSERT INTO startups
        (
            name,
            description,
            industry,
            status,
            funding_goal,
            valuation,
            team_size,
            equity,
            founded_date,
            current_funding,
            owner_id
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            data.get("name"),
            data.get("description"),
            data.get("industry"),
            data.get("status"),
            float(data.get("fundingGoal", 0)),
            float(data.get("valuation", 0)),
            int(data.get("teamSize", 1)),
            float(data.get("equity", 0)),
            data.get("foundedDate"),
            0,
            user_id   # ✅ Save owner
        ))

        conn.commit()

        # ✅ CRITICAL FIX: return the new startup's id so frontend can save it
        new_id = c.lastrowid

        conn.close()

        return {
            "message": "Startup published successfully 🚀",
            "id": new_id         # ✅ Frontend saves this to localStorage
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ---------- GET ONE ----------
@router.get("/{id}")
def get_startup(id: int):
    conn = sqlite3.connect(DB)
    c = conn.cursor()

    c.execute("SELECT * FROM startups WHERE id=?", (id,))
    row = c.fetchone()

    conn.close()

    if not row:
        raise HTTPException(
            status_code=404,
            detail="Startup not found"
        )

    return {
        "id": row[0],
        "name": row[1],
        "description": row[2],
        "industry": row[3],
        "status": row[4],
        "fundingGoal": row[5],
        "valuation": row[6],
        "teamSize": row[7],
        "equity": row[8],
        "foundedDate": row[9],
        "currentFunding": row[10]
    }