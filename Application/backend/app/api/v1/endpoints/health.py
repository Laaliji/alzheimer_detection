from fastapi import APIRouter
from typing import Dict, Any
from datetime import datetime
from app.core.config import settings
from app.services import get_ml_service

router = APIRouter()


@router.get("/health", response_model=Dict[str, Any])
async def health_check():
    """
    Health check endpoint

    Returns system status and configuration
    """
    ml_service = get_ml_service()

    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "version": settings.VERSION,
        "project_name": settings.PROJECT_NAME,
        "model_loaded": ml_service.is_loaded,
        "model_version": ml_service.model_version,
    }


@router.get("/models", response_model=Dict[str, Any])
async def list_models():
    """
    List available ML models and their information
    """
    ml_service = get_ml_service()

    return {
        "models": [
            {
                "name": "alzheimer-detection-v1",
                "version": ml_service.model_version,
                "status": "loaded" if ml_service.is_loaded else "placeholder",
                "description": "Alzheimer's disease detection model",
                "accuracy": 0.894 if ml_service.is_loaded else None,
                "is_placeholder": not ml_service.is_loaded,
            }
        ],
        "active_model": ml_service.model_version,
    }
