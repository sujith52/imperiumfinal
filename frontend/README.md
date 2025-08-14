# Hybrid Recommendation System

A modern movie recommendation system that intelligently combines collaborative filtering and content-based approaches to deliver personalized movie suggestions.

## Overview

This system leverages the strengths of both recommendation techniques:
- **Collaborative Filtering**: Uses SVD (Singular Value Decomposition) to learn from user behavior patterns
- **Content-Based Filtering**: Analyzes movie metadata using TF-IDF vectorization and cosine similarity

The hybrid approach provides more accurate and diverse recommendations than either method alone.

## Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React Admin   │────│   FastAPI        │────│   ML Models     │
│   Dashboard     │    │   Backend        │    │   (SVD + TF-IDF)│
└─────────────────┘    └──────────────────┘    └─────────────────┘
      Frontend              API Layer            Recommendation
    (Port 5173)            (Port 8000)              Engine
```

## Tech Stack

**Backend**
- FastAPI for REST API
- Surprise library for SVD implementation
- Scikit-learn for TF-IDF vectorization
- Python 3.8+

**Frontend**
- React with Vite for fast development
- Modern JavaScript (ES6+)

**Machine Learning**
- SVD for collaborative filtering
- TF-IDF + Cosine similarity for content filtering

## Quick Start

### Prerequisites
- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn

### Backend Setup

1. **Clone and navigate to the project**
   ```bash
   git clone <repository-url>
   cd rec_sys
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   # or
   venv\Scripts\activate     # Windows
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Start the API server**
   ```bash
   uvicorn Apifile:app --reload
   ```
   Server will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd rec_sys_frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   Dashboard will be available at `http://localhost:5173`

### Retrain Models
```http
POST /retrain
```

Triggers retraining of the hybrid recommendation model using the latest movie and rating data. The system processes all users and generates recommendations using both SVD collaborative filtering and TF-IDF content-based filtering.

## Features

- **Hybrid Scoring**: Combines SVD predictions with TF-IDF content similarity for improved accuracy
- **Batch Processing**: Processes all users and generates top-5 recommendations per user
- **Real-time Retraining**: Update models with new data via admin dashboard
- **Admin Dashboard**: Monitor system performance with metrics and training controls
- **Performance Tracking**: View precision, recall, RMSE, and MAE metrics
- **CORS Configuration**: Secure cross-origin requests between frontend and backend

## How It Works

1. **Data Loading**: Reads movie metadata (`movies.csv`) and user ratings (`Dataframe1.csv`)
2. **Model Loading**: Loads pre-trained SVD model (`model2.pkl`) for collaborative filtering
3. **Content Processing**: Creates TF-IDF vectors from movie titles and genres
4. **Hybrid Recommendation**: 
   - SVD generates rating predictions for unrated movies
   - Content-based filtering finds similar movies using cosine similarity
   - Final hybrid score combines both approaches
5. **Batch Generation**: Processes all users and generates top-5 recommendations each

## Development

### Project Structure
```
rec_sys/
├── main.py                 # FastAPI application
├── hybrid.py              # ML pipeline and model training
├── requirements.txt       # Python dependencies
├── rec_sys_frontend/      # React dashboard
│   ├── src/
│   ├── package.json
│   └── vite.config.js
└── README.md
```

### Running Tests
```bash

# Frontend tests
cd rec_sys_frontend
npm test
```


---

**Built with ❤️ for better movie recommendations**
