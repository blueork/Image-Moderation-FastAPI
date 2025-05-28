from fastapi import FastAPI, UploadFile, File, Response, status, HTTPException, Depends, APIRouter, Depends
from .ImageModerationService import ImageModerationService
from .models import get_token_data

router = APIRouter(tags=["moderation"])

@router.post("/moderate", dependencies=[Depends(get_token_data)])
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