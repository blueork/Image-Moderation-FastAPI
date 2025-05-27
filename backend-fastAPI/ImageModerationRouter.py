from fastapi import FastAPI, UploadFile, File, Response, status, HTTPException, Depends, APIRouter
from ImageModerationService import ImageModerationService

router = APIRouter()

@router.post("/detect-image")
async def detectImage(file: UploadFile = File(...)):
    # data = json.load(file.read())
    # file.filename = f"{uuid.uuid4()}.jpg"
    contents = await file.read()
    imageModerationService = ImageModerationService()
    response = imageModerationService.moderateImage(contents)

    # image = Image.open(io.BytesIO(contents))
    # base64_bytes = base64.b64encode(contents)

    return response
    # return {"filename": file.filename, "bytes": base64_bytes}