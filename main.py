from fastapi import FastAPI

from app.core.config import settings
from app.routers import health, predictions

app = FastAPI(title=settings.app_name, version=settings.version)

app.include_router(health.router)
app.include_router(predictions.router)
