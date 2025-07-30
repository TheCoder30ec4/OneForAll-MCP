from fastapi import FastAPI, Request, Response, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
import firebase_admin 
from firebase_admin import auth, credentials
from datetime import timedelta
import os 
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

cred = credentials.Certificate("FireBase_config.json")
firebase_admin.initialize_app(cred)

app = FastAPI() 

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5173/", "http://localhost:5175", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

security = HTTPBearer()

SESSION_COOKIE_NAME = "session"
SESSION_EXPIRE_DAYS = 5

@app.post("/sessionLogin")
async def session_login(data: dict, response: Response):
    id_token = data.get("idToken")
    if not id_token:
        raise HTTPException(status_code=400, detail="Missing ID token")

    try:
        decoded = auth.verify_id_token(id_token)
        # Create a Firebase session cookie
        expires_in = timedelta(days=SESSION_EXPIRE_DAYS)
        session_cookie = auth.create_session_cookie(id_token, expires_in=expires_in)

        # Set cookie
        response.set_cookie(
            key=SESSION_COOKIE_NAME,
            value=session_cookie,
            max_age=SESSION_EXPIRE_DAYS * 86400,
            httponly=True,
            secure=False,  # 🔐 Set to True in production (HTTPS)
            samesite="Lax",
        )
        return {"message": f"Session started for {decoded.get('email')}"}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=401, detail="Invalid ID token")

@app.get("/profile")
async def profile(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials
        decoded_token = auth.verify_id_token(token)
        return {"message": f"Hello {decoded_token['email']}"}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=401, detail="Invalid or expired token")

@app.post("/logout")
async def logout(response: Response, request: Request):
    cookie = request.cookies.get(SESSION_COOKIE_NAME)
    if cookie:
        try:
            decoded = auth.verify_session_cookie(cookie)
            auth.revoke_refresh_tokens(decoded['uid'])
        except:
            pass
    response.delete_cookie(SESSION_COOKIE_NAME)
    return {"message": "Logged out"}
