from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

from app.db.database import get_db
from app.schemas.prediction import (
    PredictionRequest,
    PredictionResponse,
    PredictionStatus,
    PredictionResult,
)
from app.models.prediction import Prediction
from app.services import get_ml_service
import logging

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/predict", response_model=PredictionResponse, status_code=status.HTTP_201_CREATED)
async def create_prediction(
    request: PredictionRequest,
    db: Session = Depends(get_db)
):
    """
    Create a new prediction for Alzheimer's detection

    This endpoint accepts patient data and optionally medical imaging data,
    runs the ML model inference, and returns the prediction results.
    """
    try:
        # Create initial prediction record
        prediction = Prediction(
            patient_id=request.patient_id,
            status=PredictionStatus.PROCESSING.value,
            image_path=request.image_path,
        )
        db.add(prediction)
        db.commit()
        db.refresh(prediction)

        logger.info(f"Created prediction {prediction.id} for patient {request.patient_id}")

        # Get ML service and make prediction
        ml_service = get_ml_service()

        # Prepare patient data
        patient_data = {
            "patient_id": request.patient_id,
            "age": request.age,
            "gender": request.gender,
            "clinical_notes": request.clinical_notes,
        }

        # Run prediction
        result = ml_service.predict(patient_data, request.image_path)

        # Update prediction with results
        prediction.status = PredictionStatus.COMPLETED.value
        prediction.has_alzheimer = int(result["has_alzheimer"])
        prediction.confidence_score = result["confidence_score"]
        prediction.risk_level = result["risk_level"]
        prediction.processing_time = result["processing_time"]
        prediction.model_version = result["model_version"]
        prediction.result_data = result
        prediction.completed_at = datetime.utcnow()

        db.commit()
        db.refresh(prediction)

        logger.info(f"Prediction {prediction.id} completed successfully")

        # Convert to response format
        return PredictionResponse(
            id=prediction.id,
            patient_id=prediction.patient_id,
            status=PredictionStatus(prediction.status),
            result=PredictionResult(
                has_alzheimer=bool(prediction.has_alzheimer),
                confidence_score=prediction.confidence_score,
                risk_level=prediction.risk_level,
                processing_time=prediction.processing_time,
                model_version=prediction.model_version,
            ),
            created_at=prediction.created_at,
            completed_at=prediction.completed_at,
        )

    except ValueError as e:
        # Update prediction status to failed
        prediction.status = PredictionStatus.FAILED.value
        prediction.error_message = str(e)
        db.commit()
        logger.error(f"Prediction {prediction.id} failed: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        # Update prediction status to failed
        if prediction:
            prediction.status = PredictionStatus.FAILED.value
            prediction.error_message = str(e)
            db.commit()
        logger.error(f"Unexpected error in prediction: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Prediction processing failed"
        )


@router.get("/results/{prediction_id}", response_model=PredictionResponse)
async def get_prediction_result(
    prediction_id: int,
    db: Session = Depends(get_db)
):
    """
    Retrieve prediction results by ID
    """
    prediction = db.query(Prediction).filter(Prediction.id == prediction_id).first()

    if not prediction:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Prediction {prediction_id} not found"
        )

    # Convert to response format
    result = None
    if prediction.status == PredictionStatus.COMPLETED.value:
        result = PredictionResult(
            has_alzheimer=bool(prediction.has_alzheimer),
            confidence_score=prediction.confidence_score,
            risk_level=prediction.risk_level,
            processing_time=prediction.processing_time,
            model_version=prediction.model_version,
        )

    return PredictionResponse(
        id=prediction.id,
        patient_id=prediction.patient_id,
        status=PredictionStatus(prediction.status),
        result=result,
        error_message=prediction.error_message,
        created_at=prediction.created_at,
        completed_at=prediction.completed_at,
    )


@router.get("/results/patient/{patient_id}", response_model=List[PredictionResponse])
async def get_patient_predictions(
    patient_id: str,
    limit: int = 10,
    db: Session = Depends(get_db)
):
    """
    Retrieve all predictions for a specific patient
    """
    predictions = (
        db.query(Prediction)
        .filter(Prediction.patient_id == patient_id)
        .order_by(Prediction.created_at.desc())
        .limit(limit)
        .all()
    )

    return [
        PredictionResponse(
            id=p.id,
            patient_id=p.patient_id,
            status=PredictionStatus(p.status),
            result=PredictionResult(
                has_alzheimer=bool(p.has_alzheimer),
                confidence_score=p.confidence_score,
                risk_level=p.risk_level,
                processing_time=p.processing_time,
                model_version=p.model_version,
            ) if p.status == PredictionStatus.COMPLETED.value else None,
            error_message=p.error_message,
            created_at=p.created_at,
            completed_at=p.completed_at,
        )
        for p in predictions
    ]


@router.get("/results", response_model=List[PredictionResponse])
async def list_predictions(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """
    List all predictions with pagination
    """
    predictions = (
        db.query(Prediction)
        .order_by(Prediction.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )

    return [
        PredictionResponse(
            id=p.id,
            patient_id=p.patient_id,
            status=PredictionStatus(p.status),
            result=PredictionResult(
                has_alzheimer=bool(p.has_alzheimer),
                confidence_score=p.confidence_score,
                risk_level=p.risk_level,
                processing_time=p.processing_time,
                model_version=p.model_version,
            ) if p.status == PredictionStatus.COMPLETED.value else None,
            error_message=p.error_message,
            created_at=p.created_at,
            completed_at=p.completed_at,
        )
        for p in predictions
    ]
