from fastapi import APIRouter, HTTPException, Depends
from passlib.context import CryptContext
from motor.motor_asyncio import AsyncIOMotorDatabase
from ..db import get_db
from ..models.user import UserCreate, UserPublic
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
import jwt
from ..settings import settings
from bson import ObjectId

router = APIRouter()
_pwd = CryptContext(schemes=["bcrypt"], deprecated="auto")
_bearer = HTTPBearer(auto_error=False)


def _create_access_token(payload: dict) -> str:
    return jwt.encode(payload, settings.JWT_SECRET, algorithm="HS256")


async def _get_current_user(
    creds: HTTPAuthorizationCredentials | None = Depends(_bearer),
    db: AsyncIOMotorDatabase = Depends(get_db),
):
    if creds is None:
        raise HTTPException(status_code=401, detail="Missing credentials")
    try:
        data = jwt.decode(creds.credentials, settings.JWT_SECRET, algorithms=["HS256"])
        user_id = data.get("sub")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token")
        doc = await db.users.find_one({"_id": ObjectId(user_id)})
        if not doc:
            raise HTTPException(status_code=401, detail="User not found")
        return doc
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

@router.post("/signup", response_model=UserPublic, status_code=201)
async def signup(payload: UserCreate, db: AsyncIOMotorDatabase = Depends(get_db)):
    existing = await db.users.find_one({"email": payload.email.lower()})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    password_hash = _pwd.hash(payload.password)
    doc = {
        "firstName": payload.firstName.strip(),
        "lastName": payload.lastName.strip(),
        "email": payload.email.lower(),
        "role": payload.role,
        "passwordHash": password_hash,
    }
    result = await db.users.insert_one(doc)
    return UserPublic(id=str(result.inserted_id), firstName=doc["firstName"], lastName=doc["lastName"], email=doc["email"], role=doc["role"])


class LoginPayload(UserCreate.model_construct().__class__):  # lightweight type reuse: only email/password
    # Build a minimal Pydantic model with just email/password while keeping validation constraints
    email: str  # will still be validated by route body using pydantic on parse
    password: str


@router.post("/login")
async def login(payload: dict, db: AsyncIOMotorDatabase = Depends(get_db)):
    # Expecting { email, password }
    email = str(payload.get("email", "")).lower()
    password = str(payload.get("password", ""))
    if not email or not password:
        raise HTTPException(status_code=422, detail="Email and password are required")

    user = await db.users.find_one({"email": email})
    if not user or not _pwd.verify(password, user.get("passwordHash", "")):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = _create_access_token({"sub": str(user.get("_id")), "role": user.get("role", "investor")})
    public = UserPublic(
        id=str(user.get("_id")),
        firstName=user.get("firstName", ""),
        lastName=user.get("lastName", ""),
        email=user.get("email", ""),
        role=user.get("role", "investor"),
    )
    return {"accessToken": token, "user": public}


@router.get("/me", response_model=UserPublic)
async def me(current=Depends(_get_current_user)):
    return UserPublic(
        id=str(current.get("_id")),
        firstName=current.get("firstName", ""),
        lastName=current.get("lastName", ""),
        email=current.get("email", ""),
        role=current.get("role", "investor"),
    )


@router.get("/users")
async def list_users(current=Depends(_get_current_user), db: AsyncIOMotorDatabase = Depends(get_db)):
    if current.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admins only")
    users = []
    async for u in db.users.find({}, {"passwordHash": 0}):
        u["id"] = str(u.pop("_id"))
        users.append(u)
    return {"items": users}

