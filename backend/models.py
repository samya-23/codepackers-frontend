from pydantic import BaseModel, EmailStr

class VisitorCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    message: str

class VisitorOut(VisitorCreate):
    id: str
    sent_via: str
    sent: bool