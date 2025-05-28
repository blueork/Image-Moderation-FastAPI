from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from db import usages_col
from datetime import datetime

class UsageLoggerMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        auth = request.headers.get("Authorization")
        if auth and auth.startswith("Bearer "):
            token = auth.split("Bearer ")[1]
            usages_col.insert_one({
                "token": token,
                "endpoint": request.url.path,
                "timestamp": datetime.now()
            })
        response = await call_next(request)
        return response
