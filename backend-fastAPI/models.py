from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from db import tokens_col

security = HTTPBearer()

def get_token_data(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token_str = credentials.credentials
    token_doc = tokens_col.find_one({"token": token_str})
    if not token_doc:
        raise HTTPException(status_code=401, detail="Invalid or missing token")
    return token_doc

def require_admin(token_data=Depends(get_token_data)):
    if not token_data.get("isAdmin", False):
        raise HTTPException(status_code=403, detail="Admin access required")
    return token_data
