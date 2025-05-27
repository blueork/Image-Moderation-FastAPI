from fastapi import FastAPI, UploadFile, File
import ImageModerationRouter
# from PIL import Image
# import io
# import base64
# import json
# import uuid

app = FastAPI()

app.include_router(ImageModerationRouter.router)

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
