# AlzheimerAI Detection Platform - Backend

FastAPI backend for the Alzheimer's Disease Detection Platform. This backend provides RESTful API endpoints for patient data management, medical image upload, and ML model predictions.

## Features

- **RESTful API** with FastAPI
- **Automatic API Documentation** (Swagger UI and ReDoc)
- **CORS Support** for frontend integration
- **SQLite Database** with SQLAlchemy ORM
- **Pydantic Schemas** for data validation
- **File Upload** for medical imaging (DICOM, NIfTI, JPEG, PNG, etc.)
- **ML Model Integration** (placeholder - ready for model deployment)
- **Comprehensive Logging**
- **Health Check Endpoints**

## Project Structure

```
backend/
├── app/
│   ├── api/
│   │   └── v1/
│   │       ├── endpoints/
│   │       │   ├── health.py       # Health check and system status
│   │       │   ├── predictions.py  # Prediction endpoints
│   │       │   └── upload.py       # File upload endpoints
│   │       └── api.py             # API router configuration
│   ├── core/
│   │   └── config.py              # Application configuration
│   ├── db/
│   │   └── database.py            # Database setup
│   ├── models/
│   │   ├── patient.py             # Patient database model
│   │   └── prediction.py          # Prediction database model
│   ├── schemas/
│   │   ├── patient.py             # Patient Pydantic schemas
│   │   └── prediction.py          # Prediction Pydantic schemas
│   ├── services/
│   │   └── ml_service.py          # ML model service (placeholder)
│   └── main.py                    # FastAPI application entry point
├── uploads/                        # Uploaded medical images
├── logs/                           # Application logs
├── requirements.txt                # Python dependencies
└── README.md                       # This file
```

## Installation

### Prerequisites

- Python 3.9 or higher
- pip (Python package manager)

### Setup

1. **Navigate to the backend directory:**

```bash
cd backend
```

2. **Create a virtual environment:**

```bash
python -m venv venv

# Activate on Linux/Mac:
source venv/bin/activate

# Activate on Windows:
venv\Scripts\activate
```

3. **Install dependencies:**

```bash
pip install -r requirements.txt
```

4. **Create environment file (optional):**

Create a `.env` file in the backend directory to override default settings:

```env
PROJECT_NAME="AlzheimerAI Detection Platform"
VERSION="1.0.0"
DATABASE_URL="sqlite:///./alzheimer_detection.db"
UPLOAD_DIR="uploads/medical_images"
MAX_UPLOAD_SIZE=524288000  # 500MB in bytes
```

## Running the Application

### Development Server

Start the FastAPI development server with auto-reload:

```bash
# From the backend directory
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Or use the shortcut:

```bash
python app/main.py
```

The API will be available at:
- **API Base URL:** http://localhost:8000
- **Interactive Docs (Swagger UI):** http://localhost:8000/docs
- **Alternative Docs (ReDoc):** http://localhost:8000/redoc

### Production Server

For production, use Gunicorn with Uvicorn workers:

```bash
pip install gunicorn
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

## API Endpoints

### Health & System

- `GET /` - Root endpoint with API information
- `GET /ping` - Simple connectivity test
- `GET /api/v1/health` - Health check with system status
- `GET /api/v1/models` - List available ML models

### Predictions

- `POST /api/v1/predict` - Create a new prediction
- `GET /api/v1/results/{prediction_id}` - Get prediction by ID
- `GET /api/v1/results/patient/{patient_id}` - Get all predictions for a patient
- `GET /api/v1/results` - List all predictions (paginated)

### File Upload

- `POST /api/v1/upload` - Upload a single medical image file
- `POST /api/v1/upload/batch` - Upload multiple files (max 10)
- `DELETE /api/v1/upload/{filename}` - Delete an uploaded file

## Usage Examples

### 1. Health Check

```bash
curl http://localhost:8000/api/v1/health
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2025-10-17T14:30:00.000Z",
  "version": "1.0.0",
  "project_name": "AlzheimerAI Detection Platform",
  "model_loaded": false,
  "model_version": "v1.0.0"
}
```

### 2. Upload Medical Image

```bash
curl -X POST http://localhost:8000/api/v1/upload \
  -F "file=@/path/to/brain_scan.dcm"
```

Response:
```json
{
  "filename": "brain_scan_abc123.dcm",
  "original_filename": "brain_scan.dcm",
  "file_path": "uploads/medical_images/brain_scan_abc123.dcm",
  "file_size": 1234567,
  "content_type": "application/dicom",
  "message": "File uploaded successfully"
}
```

### 3. Create Prediction

```bash
curl -X POST http://localhost:8000/api/v1/predict \
  -H "Content-Type: application/json" \
  -d '{
    "patient_id": "P1001",
    "age": 72,
    "gender": "male",
    "clinical_notes": "Patient shows mild cognitive decline",
    "image_path": "uploads/medical_images/brain_scan_abc123.dcm"
  }'
```

Response:
```json
{
  "id": 1,
  "patient_id": "P1001",
  "status": "completed",
  "result": {
    "has_alzheimer": false,
    "confidence_score": 0.923,
    "risk_level": "low",
    "processing_time": 0.125,
    "model_version": "v1.0.0"
  },
  "created_at": "2025-10-17T14:30:00.000Z",
  "completed_at": "2025-10-17T14:30:00.125Z"
}
```

### 4. Get Prediction Results

```bash
curl http://localhost:8000/api/v1/results/1
```

## ML Model Integration

The backend is ready for ML model integration. Currently, it uses placeholder predictions for demonstration purposes.

### Integrating Your Model

1. **Save your trained model:**

```python
# Example: Save with joblib
import joblib
joblib.dump(model, 'models/alzheimer_model.pkl')
```

2. **Update `app/services/ml_service.py`:**

Uncomment the model loading code in the `load_model()` method:

```python
def load_model(self):
    import joblib
    with open(settings.MODEL_PATH, 'rb') as f:
        self.model = joblib.load(f)
    self.is_loaded = True
```

3. **Update the `predict()` method:**

Replace the placeholder prediction logic with your model's inference:

```python
def predict(self, patient_data: Dict[str, Any], image_path: Optional[str] = None):
    # Preprocess data
    features = self.preprocess_data(patient_data, image_path)

    # Make prediction
    prediction = self.model.predict(features)
    confidence = self.model.predict_proba(features)[0]

    # Return results
    return {
        "has_alzheimer": bool(prediction[0]),
        "confidence_score": float(confidence[1]),
        "risk_level": self._determine_risk_level(confidence[1], prediction[0]),
        "processing_time": ...,
        "model_version": self.model_version,
    }
```

4. **Uncomment required dependencies in `requirements.txt`:**

```txt
joblib==1.3.2
pydicom==2.4.3  # For DICOM files
nibabel==5.1.0  # For NIfTI files
```

## Database

The application uses SQLite by default. The database file (`alzheimer_detection.db`) is created automatically on first run.

### Database Models

- **Patient**: Stores patient information
- **Prediction**: Stores prediction results and metadata

### Database Migrations

For schema changes, you can use Alembic (already included in requirements):

```bash
# Initialize Alembic
alembic init alembic

# Create a migration
alembic revision --autogenerate -m "description"

# Apply migrations
alembic upgrade head
```

## Configuration

Configuration is managed through `app/core/config.py` and can be overridden with environment variables or a `.env` file.

Key settings:
- `PROJECT_NAME`: Application name
- `VERSION`: API version
- `API_V1_PREFIX`: API URL prefix (default: `/api/v1`)
- `BACKEND_CORS_ORIGINS`: Allowed CORS origins
- `DATABASE_URL`: Database connection string
- `UPLOAD_DIR`: Directory for uploaded files
- `MAX_UPLOAD_SIZE`: Maximum file size (default: 500MB)
- `MODEL_PATH`: Path to ML model file

## Testing

Run tests with pytest (install with `pip install pytest`):

```bash
pytest tests/
```

## Logging

Logs are written to:
- Console (stdout)
- Files in `logs/` directory (configure as needed)

Log levels can be configured in `app/main.py`.

## Security Considerations

- File uploads are validated for type and size
- CORS is configured for specific origins
- SQL injection protection via SQLAlchemy ORM
- Input validation with Pydantic schemas

For production:
- Use HTTPS
- Add authentication/authorization (JWT, OAuth2)
- Implement rate limiting
- Use a production database (PostgreSQL, MySQL)
- Configure proper CORS origins
- Add request validation and sanitization

## Future Enhancements

- [ ] Add authentication and user management
- [ ] Implement MLflow integration for model versioning
- [ ] Add async task queue (Celery) for long-running predictions
- [ ] Implement caching (Redis)
- [ ] Add comprehensive test coverage
- [ ] Set up CI/CD pipeline
- [ ] Add monitoring and metrics (Prometheus, Grafana)
- [ ] Implement real-time prediction status updates (WebSockets)

## License

This project is part of the AlzheimerAI Detection Platform.

## Support

For issues and questions, please refer to the main project documentation.
