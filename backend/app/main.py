from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings

app = FastAPI(
    title="UBER COMMAND CENTER API",
    version="1.0.0",
    description="Admin dashboard backend for ride operations demo system.",
)

# Fetch allowed origins from settings or default to allow all origins for deployment
allowed_origins = getattr(settings, "CORS_ORIGINS", ["*"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins if allowed_origins else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "message": "Welcome to UBER COMMAND CENTER API",
        "docs": "/docs",
        "status": "online"
    }

@app.get("/health")
def health_check():
    return {"status": "ok", "service": getattr(settings, "app_name", "UBER COMMAND CENTER")}

@app.get("/api/dashboard/summary")
def dashboard_summary():
    return {
        "total_rides": 18420,
        "active_drivers": 1284,
        "total_revenue": 2380000,
        "customer_rating": 4.8,
        "completed_rides": 16204,
        "cancelled_rides": 542,
    }

@app.get("/api/auth/me")
def auth_me():
    return {
        "id": 1,
        "username": "admin",
        "role": "Super Admin",
        "name": "Admin"
    }