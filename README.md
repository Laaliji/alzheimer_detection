# AlzheimerAI - Frontend Interface

A modern, comprehensive React frontend for an Alzheimer's detection platform, designed with a professional healthcare aesthetic and medical-themed color palette.

![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?logo=tailwind-css)

## 🎯 Features

### 1. 📊 Dashboard

- Real-time analytics and system status
- Patient metrics visualization (247 patients analyzed, 89.4% model accuracy)
- Recent activity feed with color-coded status indicators
- Model performance metrics with progress bars:
  - Sensitivity: 92%
  - Specificity: 87%
  - Precision: 89%
  - F1 Score: 90%
- Quick action buttons for common tasks

### 2. 📤 Patient Upload

- Drag-and-drop file upload interface
- Multiple file format support:
  - Medical imaging: DICOM (.dcm), NIfTI (.nii)
  - Standard formats: JPEG, PNG, CSV, JSON
- Patient information form with fields:
  - Patient ID
  - Age
  - Gender
  - Clinical Notes
- Real-time upload progress tracking
- File size limit: 500MB per file
- HIPAA-compliant data handling (placeholder for backend implementation)

### 3. 🧠 AI/ML Results

- Latest analysis results with confidence scores
- Interactive data visualizations:
  - **Line Chart**: Model confidence trend over time
  - **Pie Chart**: Classification distribution (Detected/No Detection/Uncertain)
- Detailed predictions table showing:
  - Patient ID
  - Analysis timestamp
  - Prediction result
  - Confidence percentage
  - Processing status
- Risk assessment indicators

### 4. ⚙️ Pipeline Monitor

- Real-time ML pipeline execution tracking
- Visual stage-by-stage progress:
  - Data Ingestion
  - Preprocessing
  - Model Inference
  - Post-processing
  - Results Storage
- Pipeline metrics dashboard:
  - Active pipelines: 3
  - Completed today: 47
  - Average duration: 8.2s
  - Failed count: 2
- Recent pipeline executions history with status tracking

### 5. 🔌 Backend Configuration

- FastAPI backend URL configuration interface
- Connection status testing with visual feedback
- MLOps integration status display:
  - Model Registry (MLflow)
  - Experiment Tracking
  - Model Deployment
  - API Endpoints
- Complete API documentation:
  - `POST /api/v1/predict` - Submit patient data for analysis
  - `GET /api/v1/results/:id` - Retrieve analysis results
  - `POST /api/v1/upload` - Upload medical imaging files
  - `GET /api/v1/models` - List available ML models
  - `GET /api/v1/health` - Check backend health status

## 🎨 Design System

### Color Palette (Medical Theme)

```css
Primary Blue:    #4A90E2  /* Main brand color */
Primary Light:   #E8F4F8  /* Backgrounds, hover states */
Secondary Green: #7ED8A9  /* Success, positive indicators */
Accent Teal:     #5DADE2  /* Gradients, highlights */
Background Gray: #F5F7FA  /* Page background */
Text Dark:       #2C3E50  /* Primary text */
Text Gray:       #7F8C8D  /* Secondary text */
Border Light:    #E1E8ED  /* Borders, dividers */
```

### Design Principles

- Clean, professional healthcare aesthetic
- Soft shadows and rounded corners
- Smooth animations and transitions
- Clear visual hierarchy
- High contrast for readability
- Accessible color combinations

## 🛠 Tech Stack

- **React** 18+ with TypeScript
- **Tailwind CSS** 3.3.0 for utility-first styling
- **Recharts** for interactive data visualization
- **Lucide React** for consistent iconography
- **Create React App** as build tool

## 🚀 Getting Started

### Prerequisites

- Node.js 14+
- npm or yarn

### Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

The application will be available at **http://localhost:3000**

### Scripts

- `npm start` - Start development server with hot reload
- `npm test` - Run test suite
- `npm run build` - Create production build
- `npm run eject` - Eject from Create React App (⚠️ irreversible)

## 📁 Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.tsx              # Top navigation bar with branding
│   │   ├── Sidebar.tsx             # Side navigation menu
│   │   ├── Dashboard.tsx           # Main dashboard view
│   │   ├── PatientUpload.tsx       # File upload interface
│   │   ├── ResultsView.tsx         # AI/ML results visualization
│   │   ├── PipelineMonitor.tsx     # Pipeline tracking dashboard
│   │   └── BackendConnection.tsx   # Backend configuration panel
│   ├── App.tsx                     # Main app component with routing
│   ├── App.css                     # Minimal global styles
│   ├── index.tsx                   # React entry point
│   └── index.css                   # Tailwind directives
├── tailwind.config.js              # Tailwind configuration
├── postcss.config.js               # PostCSS configuration
├── tsconfig.json                   # TypeScript configuration
└── package.json                    # Dependencies and scripts
```

## 🔗 Backend Integration

This frontend is designed to integrate seamlessly with a FastAPI backend. All components include:

- Placeholder functions for API calls
- Mock data for demonstration
- Type-safe interfaces ready for real data
- Error handling structure

### API Integration Points

1. **Patient Upload**

   - Endpoint: `POST /api/v1/upload`
   - Payload: FormData with medical files

2. **Prediction Request**

   - Endpoint: `POST /api/v1/predict`
   - Payload: Patient data + file references

3. **Results Retrieval**

   - Endpoint: `GET /api/v1/results/:id`
   - Response: Analysis results with confidence scores

4. **Model Information**

   - Endpoint: `GET /api/v1/models`
   - Response: Available models and versions

5. **Health Check**
   - Endpoint: `GET /api/v1/health`
   - Response: Backend status

## 🔮 Future Enhancements

- [ ] Real backend API integration with FastAPI
- [ ] User authentication and role-based access control
- [ ] Advanced 3D medical imaging visualization
- [ ] Export analysis reports as PDF
- [ ] Real-time WebSocket updates for pipeline status
- [ ] Multi-language support (i18n)
- [ ] Dark mode toggle
- [ ] Advanced search and filtering
- [ ] Model comparison and A/B testing tools
- [ ] Comprehensive audit trail and logging
- [ ] Patient data encryption at rest

## 🧪 MLOps Integration

The interface is prepared for integration with modern MLOps tools:

- **Model Registry**: MLflow for model versioning and management
- **Experiment Tracking**: Monitor training runs and hyperparameters
- **Model Deployment**: Automated deployment to production
- **API Gateway**: FastAPI backend for model serving
- **Monitoring**: Performance metrics and drift detection

## 📝 Development Notes

- All components use **Tailwind CSS** for styling (no separate CSS files per component)
- **TypeScript** is used throughout for type safety and better IDE support
- Components are **functional** with React Hooks (no class components)
- **Mock data** is used for demonstration; replace with real API calls
- **Responsive design** supports mobile (320px+), tablet (768px+), and desktop (1024px+)
- **Accessibility** considerations included (ARIA labels, keyboard navigation)

## 🔒 Security & Privacy

- HIPAA compliance considerations built into design
- Data encryption placeholders for backend integration
- Secure file upload handling
- No sensitive data stored in frontend state
- API authentication ready (tokens, OAuth)

## 📄 License

This project is part of an Alzheimer's detection research platform. Please ensure compliance with healthcare data regulations (HIPAA, GDPR) when deploying.

## 🤝 Contributing

This is a research/educational project. Contributions should focus on:

- Defensive security practices
- Healthcare data privacy
- Accessibility improvements
- Performance optimizations
- Documentation enhancements
