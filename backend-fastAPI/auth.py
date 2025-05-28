from fastapi import APIRouter, Depends, HTTPException
from db import tokens_col
from models import require_admin
from datetime import datetime
import secrets

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/tokens", dependencies=[Depends(require_admin)])
def create_token(is_admin: bool = False):
    token = secrets.token_urlsafe(32)
    tokens_col.insert_one({
        "token": token,
        "isAdmin": is_admin,
        "createdAt": datetime.now()
    })
    return {"token": token, "isAdmin": is_admin}

@router.get("/tokens", dependencies=[Depends(require_admin)])
def list_tokens():
    return list(tokens_col.find({}, {"_id": 0}))

@router.delete("/tokens/{token}", dependencies=[Depends(require_admin)])
def delete_token(token: str):
    result = tokens_col.delete_one({"token": token})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Token not found")
    return {"detail": "Token deleted"}
