# app/socket_manager.py
import socketio

sio = socketio.AsyncServer(
    async_mode="asgi",
    cors_allowed_origins="*",
    logger=True,
    engineio_logger=True
)

@sio.event
async def connect(sid, environ):
    print(f"✅ Client connected: {sid}")

@sio.event
async def disconnect(sid):
    print(f"❌ Client disconnected: {sid}")

@sio.event
async def join_room(sid, data):
    startup_id = data.get("startup_id")
    try:
        startup_id = int(startup_id)
    except Exception:
        startup_id = None

    if not startup_id or startup_id <= 0:
        print(f"⚠️ join_room ignored (invalid startup_id): {data}")
        return
    room = f"startup_{startup_id}"
    await sio.enter_room(sid, room)
    print(f"{sid} joined room: {room}")

@sio.event
async def send_message(sid, data):
    startup_id = data.get("startup_id")
    try:
        startup_id = int(startup_id)
    except Exception:
        startup_id = None

    if not startup_id or startup_id <= 0:
        print(f"⚠️ send_message ignored (invalid startup_id): {data}")
        return
    room = f"startup_{startup_id}"
    # Emit to everyone in the startup room (including sender) so the UI stays in sync.
    await sio.emit("receive_message", data, room=room)
    print(f"📨 message emitted to {room}: sender={data.get('sender')} name={data.get('name')}")