# from fastapi import FastAPI, UploadFile, File
# from ../Services import ImageModerationService

# @app.post("/detect-image")
# async def detectImage(file: UploadFile = File(...)):
#     # data = json.load(file.read())
#     # file.filename = f"{uuid.uuid4()}.jpg"
#     contents = await file.read()
#     image = Image.open(io.BytesIO(contents))

#     base64_bytes = base64.b64encode(contents)

#     return {"filename": file.filename, "bytes": base64_bytes}