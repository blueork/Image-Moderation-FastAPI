from fastapi import FastAPI, UploadFile, File
from PIL import Image
import io
import json
import uuid

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/check")
def check():
    return "Hello World"

@app.post("/detect-image")
async def detectImage(file: UploadFile = File(...)):
    # data = json.load(file.read())
    # file.filename = f"{uuid.uuid4()}.jpg"
    contents = await file.read()
    image = Image.open(io.BytesIO(contents))

    return {"filename": file.filename}
