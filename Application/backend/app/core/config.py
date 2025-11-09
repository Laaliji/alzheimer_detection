from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    # Application
    PROJECT_NAME: str = "AlzheimerAI Detection Platform"
    VERSION: str = "1.0.0"
    API_V1_PREFIX: str = "/api/v1"

    # CORS
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:8000",
    ]

    # File Upload
    UPLOAD_DIR: str = "uploads/medical_images"
    MAX_UPLOAD_SIZE: int = 500 * 1024 * 1024  # 500MB
    ALLOWED_EXTENSIONS: List[str] = [".dcm", ".nii", ".nii.gz", ".jpg", ".jpeg", ".png", ".csv", ".json"]

    # Database
    DATABASE_URL: str = "sqlite:///./alzheimer_detection.db"

    # ML Model
    MODEL_PATH: str = "models/alzheimer_model.pkl"
    MODEL_VERSION: str = "v1.0.0"

    # MLOps
    MLFLOW_TRACKING_URI: str = "http://localhost:5000"
    MLFLOW_EXPERIMENT_NAME: str = "alzheimer-detection"

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
