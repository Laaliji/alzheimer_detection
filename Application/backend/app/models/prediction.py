from sqlalchemy import Column, Integer, String, DateTime, Text, JSON, Float
from sqlalchemy.sql import func
from app.db.database import Base


class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(String(100), index=True, nullable=False)
    status = Column(String(20), default="pending", nullable=False)

    # Results
    has_alzheimer = Column(Integer, nullable=True)  # 0 or 1
    confidence_score = Column(Float, nullable=True)
    risk_level = Column(String(20), nullable=True)
    processing_time = Column(Float, nullable=True)
    model_version = Column(String(50), nullable=True)

    # Additional data
    result_data = Column(JSON, nullable=True)
    error_message = Column(Text, nullable=True)
    image_path = Column(String(500), nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    completed_at = Column(DateTime(timezone=True), nullable=True)
