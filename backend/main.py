from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List
from datetime import datetime
import json
import os

app = FastAPI()

DATA_FILE = "submissions.json"

class Visitor(BaseModel):
    name: str
    email: str
    phone: str
    message: str = ""
    source: str = "form"
    timestamp: str = Field(default_factory=lambda: datetime.now().isoformat())
    queryMethod: List[str] = []
    queryId: str = ""

# CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def load_data():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r") as f:
            return json.load(f)
    return []

def save_data(data):
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=4)

@app.post("/submit-form")
async def submit_form(visitor: Visitor):
    data = load_data()
    data.append(visitor.dict())
    save_data(data)
    return {"message": "Form submitted successfully"}

@app.get("/dashboard")
def get_dashboard():
    return load_data()

# ✅ Root route added here
@app.get("/")
def root():
    return {"message": "API is live. Use /submit-form to post data or /dashboard to view data."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000)
