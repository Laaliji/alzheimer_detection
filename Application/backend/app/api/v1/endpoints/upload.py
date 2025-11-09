from fastapi import APIRouter, UploadFile, File, HTTPException, status
from typing import Dict, Any, List
import os
import shutil
from pathlib import Path
import logging

from app.core.config import settings

logger = logging.getLogger(__name__)
router = APIRouter()


def validate_file_extension(filename: str) -> bool:
    """Validate file extension against allowed types"""
    ext = Path(filename).suffix.lower()
    return ext in settings.ALLOWED_EXTENSIONS


def get_file_size(file: UploadFile) -> int:
    """Get file size in bytes"""
    file.file.seek(0, 2)  # Seek to end
    size = file.file.tell()
    file.file.seek(0)  # Reset to beginning
    return size


@router.post("/upload", response_model=Dict[str, Any])
async def upload_medical_file(
    file: UploadFile = File(...)
):
    """
    Upload medical imaging files (DICOM, NIfTI, JPEG, PNG, etc.)

    Accepts medical imaging data and stores it for processing.
    Returns the file path that can be used in prediction requests.
    """
    try:
        # Validate file extension
        if not validate_file_extension(file.filename):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"File type not allowed. Allowed types: {', '.join(settings.ALLOWED_EXTENSIONS)}"
            )

        # Check file size
        file_size = get_file_size(file)
        if file_size > settings.MAX_UPLOAD_SIZE:
            raise HTTPException(
                status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                detail=f"File too large. Maximum size: {settings.MAX_UPLOAD_SIZE / (1024*1024)}MB"
            )

        # Create upload directory if it doesn't exist
        upload_dir = Path(settings.UPLOAD_DIR)
        upload_dir.mkdir(parents=True, exist_ok=True)

        # Generate unique filename
        timestamp = Path(file.filename).stem
        extension = Path(file.filename).suffix
        unique_filename = f"{timestamp}_{os.urandom(8).hex()}{extension}"
        file_path = upload_dir / unique_filename

        # Save file
        with file_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        logger.info(f"File uploaded successfully: {unique_filename}")

        return {
            "filename": unique_filename,
            "original_filename": file.filename,
            "file_path": str(file_path),
            "file_size": file_size,
            "content_type": file.content_type,
            "message": "File uploaded successfully",
        }

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"File upload failed: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="File upload failed"
        )


@router.post("/upload/batch", response_model=Dict[str, Any])
async def upload_multiple_files(
    files: List[UploadFile] = File(...)
):
    """
    Upload multiple medical imaging files at once

    Useful for uploading multiple scans or views for a single patient
    """
    if len(files) > 10:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Maximum 10 files per batch upload"
        )

    uploaded_files = []
    failed_files = []

    for file in files:
        try:
            # Validate and upload each file
            if not validate_file_extension(file.filename):
                failed_files.append({
                    "filename": file.filename,
                    "error": "Invalid file type"
                })
                continue

            file_size = get_file_size(file)
            if file_size > settings.MAX_UPLOAD_SIZE:
                failed_files.append({
                    "filename": file.filename,
                    "error": "File too large"
                })
                continue

            # Upload file
            upload_dir = Path(settings.UPLOAD_DIR)
            upload_dir.mkdir(parents=True, exist_ok=True)

            timestamp = Path(file.filename).stem
            extension = Path(file.filename).suffix
            unique_filename = f"{timestamp}_{os.urandom(8).hex()}{extension}"
            file_path = upload_dir / unique_filename

            with file_path.open("wb") as buffer:
                shutil.copyfileobj(file.file, buffer)

            uploaded_files.append({
                "filename": unique_filename,
                "original_filename": file.filename,
                "file_path": str(file_path),
                "file_size": file_size,
            })

        except Exception as e:
            logger.error(f"Failed to upload {file.filename}: {str(e)}")
            failed_files.append({
                "filename": file.filename,
                "error": str(e)
            })

    return {
        "uploaded_count": len(uploaded_files),
        "failed_count": len(failed_files),
        "uploaded_files": uploaded_files,
        "failed_files": failed_files,
    }


@router.delete("/upload/{filename}")
async def delete_uploaded_file(filename: str):
    """
    Delete an uploaded file

    Use this to clean up uploaded files that are no longer needed
    """
    try:
        file_path = Path(settings.UPLOAD_DIR) / filename

        if not file_path.exists():
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="File not found"
            )

        # Security check: ensure file is in upload directory
        if not str(file_path.resolve()).startswith(str(Path(settings.UPLOAD_DIR).resolve())):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied"
            )

        file_path.unlink()
        logger.info(f"File deleted: {filename}")

        return {"message": "File deleted successfully", "filename": filename}

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to delete file {filename}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="File deletion failed"
        )
