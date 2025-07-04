from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List
from datetime import datetime
import json, os, hashlib
from dotenv import load_dotenv
import uuid

load_dotenv()

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

class QueryUpdate(BaseModel):
    message: str
    method: str  # must be "email" or "whatsapp"

# CORS setup
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
    visitor_dict = visitor.dict()

    unique_id = hashlib.sha256((visitor.email + visitor.timestamp).encode()).hexdigest()[:10]
    visitor_dict["id"] = unique_id
    visitor_dict["queryMethod"] = []
    visitor_dict["message"] = ""
    visitor_dict["queryId"] = ""

    data.append(visitor_dict)
    save_data(data)
    return {"message": "Form submitted successfully", "id": unique_id}

@app.post("/update-query/{visitor_id}")
async def update_query(visitor_id: str, query: QueryUpdate):
    data = load_data()
    updated = False

    for v in data:
        if v.get("id") == visitor_id:
            if query.method not in v["queryMethod"]:
                v["queryMethod"].append(query.method)
            v["message"] = query.message
            if not v.get("queryId"):
                v["queryId"] = str(uuid.uuid4())[:8]
            updated = True
            break

    if not updated:
        raise HTTPException(status_code=404, detail="Visitor not found")

    save_data(data)
    return {"message": "Query updated successfully"}

@app.get("/dashboard")
def get_dashboard():
    return load_data()

@app.get("/")
def root():
    return {"message": "API is live. Use /submit-form and /dashboard."}
