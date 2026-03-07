from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    MONGODB_URI: str = "mongodb://localhost:27017"
    DB_NAME: str = "upfund"
    JWT_SECRET: str = "change_me"
    ALLOWED_ORIGINS: str = "http://localhost:5173,http://localhost:5174"

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
