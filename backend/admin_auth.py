from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

security = HTTPBearer()

def verify_admin(credentials: HTTPAuthorizationCredentials = Depends(security)):
    correct_token = "admin"  # Or get from .env using os.getenv("ADMIN_TOKEN")
    if credentials.credentials != correct_token:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return True
