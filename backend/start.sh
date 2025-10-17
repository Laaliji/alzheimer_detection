#!/bin/bash

# AlzheimerAI Backend Startup Script

echo "===================================="
echo "AlzheimerAI Backend Server"
echo "===================================="

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
    if [ $? -ne 0 ]; then
        echo "Error: Failed to create virtual environment"
        echo "On Ubuntu/Debian, run: sudo apt install python3-venv"
        exit 1
    fi
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install dependencies
if [ ! -f "venv/.installed" ]; then
    echo "Installing dependencies..."
    pip install -r requirements.txt
    if [ $? -eq 0 ]; then
        touch venv/.installed
        echo "Dependencies installed successfully"
    else
        echo "Error installing dependencies"
        exit 1
    fi
else
    echo "Dependencies already installed"
fi

# Create necessary directories
mkdir -p uploads/medical_images logs models

# Start the server
echo "Starting FastAPI server..."
echo "API will be available at: http://localhost:8000"
echo "API Documentation: http://localhost:8000/docs"
echo ""
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
