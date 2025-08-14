
# IMPERIUM - AI-Powered Recommendation System

IMPERIUM is a full-stack AI recommendation engine that provides personalized suggestions based on **hybrid recommendation logic** (Content-Based Filtering + Collaborative Filtering). It includes a FastAPI backend, React frontend admin panel, PostgreSQL database, and Redis caching.

---

## Setup Instructions

### 1. Backend Configuration

1. **Update FastAPI ports and CORS middleware** in `main.py`:

````
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:3000"],  # change ports if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
````

> ⚠️ Ensure the ports match your frontend configuration to avoid CORS or connection errors.

2. **Install backend dependencies**:

```bash
cd backend
pip install -r requirements.txt
```

3. **Start FastAPI server**:

```bash
python -m uvicorn app.main:app --reload
```

---

### 2. Frontend Configuration

1. **Update environment variables** in:

```
C:\Users\sujit\world\imperiumfinal\frontend\rec_sys\.env
```

* Change `VITE_API_BASE_URL` and ports according to your backend server.

2. **Install frontend dependencies**:

```bash
cd frontend/rec_sys
npm install
```

3. **Start frontend server**:

```bash
npm run dev
```

> ⚠️ Make sure the frontend port matches the CORS settings in `main.py`.

---

### 3. Virtual Environment (Optional, Conda Users)

1. **Create and activate virtual environment**:

```bash
conda create -n surprise_env python=3.10
conda activate surprise_env
```

2. **Install requirements** in both backend and frontend folders:

```bash
pip install -r requirements.txt
```

---

### 4. Model Training

1. **Update file paths** in `hybrid.py`:

```python
# Example: update CSV and DataFrame paths
movies_csv_path = "path/to/movies.csv"
dataframe_path = "path/to/dataframe1.csv"
```

2. **Train model**:

```bash
python modelfile.py      # generates model2.pkl
python hybrid.py         # additional hybrid logic
```

---

### 5. Running the Project

* **Backend**: FastAPI server (`uvicorn`) in one terminal.
* **Frontend**: Vite dev server (`npm run dev`) in a separate terminal.

> ⚠️ Always check that frontend and backend ports are consistent. Mismatched ports are the main cause of errors.

---

## Notes

* Make sure Redis and PostgreSQL are running if used.
* `.env` files must be in the frontend folder (`frontend/rec_sys`) for React to read environment variables.
* Always start backend first, then frontend.
* Adjust paths in `hybrid.py` before training the model.

---

```
We will win for sure.

```
