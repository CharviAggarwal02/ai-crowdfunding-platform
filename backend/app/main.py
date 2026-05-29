from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import socketio

from .routes import auth, investment, analytics, prediction
from .routes import startups
from .routes import campaign
from .routes import admin
from .routes import updates
from .routes import messages

from .db import engine, Base
from . import models
from .models import user
from .models.message import Message

# ⭐ IMPORT sio from socket_manager (don't create a new one here)
from .socket_manager import sio

# ⭐ Name it fastapi_app, NOT app
fastapi_app = FastAPI()

# CREATE TABLES
Base.metadata.create_all(bind=engine)

# CORS
fastapi_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# REGISTER ROUTES
fastapi_app.include_router(auth.router)
fastapi_app.include_router(investment.router)
fastapi_app.include_router(analytics.router)
fastapi_app.include_router(prediction.router)
fastapi_app.include_router(startups.router)
fastapi_app.include_router(campaign.router)
fastapi_app.include_router(admin.router)
fastapi_app.include_router(updates.router)
fastapi_app.include_router(messages.router)

# ⭐ WRAP FastAPI with Socket.io — do this LAST
app = socketio.ASGIApp(
    socketio_server=sio,
    other_asgi_app=fastapi_app,
    socketio_path="/socket.io"
)