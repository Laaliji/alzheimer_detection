from fastapi import APIRouter
from app.api.v1.endpoints import health, predictions, upload

api_router = APIRouter()

# Include all endpoint routers
api_router.include_router(health.router, tags=["health"])
api_router.include_router(predictions.router, tags=["predictions"])
api_router.include_router(upload.router, tags=["upload"])
