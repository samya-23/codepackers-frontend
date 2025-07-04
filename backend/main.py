from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List
from datetime import datetime
import json, os, hashlib, uuid, smtplib
from dotenv import load_dotenv
from email.message import EmailMessage

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
    method: str  # either "email" or "whatsapp"

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Utility Functions
def load_data():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r") as f:
            return json.load(f)
    return []

def save_data(data):
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=4)

def send_email(subject: str, body: str):
    sender = os.getenv("EMAIL_USER")
    password = os.getenv("EMAIL_PASS")
    receiver = os.getenv("RECEIVER_EMAIL")

    msg = EmailMessage()
    msg.set_content(body)
    msg["Subject"] = subject
    msg["From"] = sender
    msg["To"] = receiver

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
            smtp.login(sender, password)
            smtp.send_message(msg)
    except Exception as e:
        print("EMAIL ERROR:", e)
        raise HTTPException(status_code=500, detail="Failed to send email")

# Routes
@app.post("/submit-form")
async def submit_form(visitor: Visitor):
    data = load_data()
    visitor_dict = visitor.dict()

    unique_id = hashlib.sha256((visitor.email + visitor.timestamp).encode()).hexdigest()[:10]
    visitor_dict["queryId"] = unique_id  # <-- use this instead of "id"
    visitor_dict["queryMethod"] = []
    visitor_dict["message"] = ""

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

            if query.method == "email":
                subject = f"New Query from {v['name']}"
                body = f"""
You received a new query via Email.

Name: {v['name']}
Email: {v['email']}
Phone: {v['phone']}

Message:
{query.message}

Query ID: {v['queryId']}
                """
                send_email(subject, body)

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
