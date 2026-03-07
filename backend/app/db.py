from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from .settings import settings

_client: AsyncIOMotorClient | None = None
_db: AsyncIOMotorDatabase | None = None

async def get_db() -> AsyncIOMotorDatabase:
    global _client, _db
    if _db is None:
        _client = AsyncIOMotorClient(settings.MONGODB_URI)
        _db = _client[settings.DB_NAME]
    return _db

