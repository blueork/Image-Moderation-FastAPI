from fastapi import FastAPI, UploadFile, File
# import ImageModerationRouter
from middleware import UsageLoggerMiddleware
from auth import router as auth_router
from ImageModerationRouter import router as moderate_router
from db import tokens_col
from datetime import datetime
import secrets
from contextlib import asynccontextmanager
# from PIL import Image
# import io
# import base64
# import json
# import uuid

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Did this get executed?")
    if tokens_col.count_documents({}) == 0:
        token = secrets.token_urlsafe(32)
        tokens_col.insert_one({
            "token": token,
            "isAdmin": True,
            "createdAt": datetime.now()
        })
        print(f"[Initial Admin Token] {token}")
    yield

# @app.on_event("startup")
# def create_initial_admin():
#     if tokens_col.count_documents({}) == 0:
#         token = secrets.token_urlsafe(32)
#         tokens_col.insert_one({
#             "token": token,
#             "isAdmin": True,
#             "createdAt": datetime.utcnow()
#         })
#         print(f"[Initial Admin Token] {token}")

app = FastAPI(lifespan=lifespan)
app.add_middleware(UsageLoggerMiddleware)

# app.include_router(ImageModerationRouter.router)
app.include_router(auth_router)
app.include_router(moderate_router)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/check")
def check():
    return "Hello World"

# @app.post("/detect-image")
# async def detectImage(file: UploadFile = File(...)):
#     # data = json.load(file.read())
#     # file.filename = f"{uuid.uuid4()}.jpg"
#     contents = await file.read()
#     image = Image.open(io.BytesIO(contents))

#     base64_bytes = base64.b64encode(contents)

#     return {"filename": file.filename, "bytes": base64_bytes}
