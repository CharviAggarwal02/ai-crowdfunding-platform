from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

<<<<<<< HEAD
from app.routes.auth import router as auth_router
from app.routes.prediction import router as prediction_router
from app.routes.startup import router as startup_router
from app.routes.investment import router as investment_router
from app.settings import settings
from app.db import Base, engine

app = FastAPI(title="UpFund API")

# Create database tables
Base.metadata.create_all(bind=engine)

=======
from .routes.auth import router as auth_router
from .settings import settings

app = FastAPI(title="UpFund API")

>>>>>>> 72f8142569886c698ad711df7ac4c6c518b8ec75
origins = [o.strip() for o in settings.ALLOWED_ORIGINS.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins or ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.get("/")
async def root():
<<<<<<< HEAD
    return {
        "message": "UpFund API is running",
        "docs": "/docs"
    }

# Routers
app.include_router(auth_router, prefix="/api/auth", tags=["auth"])
app.include_router(prediction_router, prefix="/api", tags=["prediction"])
app.include_router(startup_router, prefix="/api", tags=["startup"])
app.include_router(investment_router, prefix="/api", tags=["investment"])
=======
    return {"message": "UpFund API is running", "docs": "/docs"}

app.include_router(auth_router, prefix="/api/auth", tags=["auth"])

>>>>>>> 72f8142569886c698ad711df7ac4c6c518b8ec75
