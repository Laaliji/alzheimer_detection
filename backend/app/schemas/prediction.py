from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
from datetime import datetime
from enum import Enum


class PredictionStatus(str, Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"


class RiskLevel(str, Enum):
    LOW = "low"
    MODERATE = "moderate"
    HIGH = "high"


class PredictionRequest(BaseModel):
    patient_id: str = Field(..., description="Patient identifier")
    age: int = Field(..., ge=0, le=150)
    gender: str
    clinical_notes: Optional[str] = None
    image_path: Optional[str] = Field(None, description="Path to uploaded medical image")


class PredictionResult(BaseModel):
    has_alzheimer: bool = Field(..., description="Whether Alzheimer's is detected")
    confidence_score: float = Field(..., ge=0.0, le=1.0, description="Prediction confidence (0-1)")
    risk_level: RiskLevel = Field(..., description="Risk assessment level")
    processing_time: float = Field(..., description="Processing time in seconds")
    model_version: str = Field(..., description="ML model version used")


class PredictionResponse(BaseModel):
    id: int
    patient_id: str
    status: PredictionStatus
    result: Optional[PredictionResult] = None
    error_message: Optional[str] = None
    created_at: datetime
    completed_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class PredictionCreate(BaseModel):
    patient_id: str
    status: PredictionStatus = PredictionStatus.PENDING
    result_data: Optional[Dict[str, Any]] = None
    error_message: Optional[str] = None
