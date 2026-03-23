from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class PredictionCreate(BaseModel):
    input: str
    label: Optional[str] = None
    confidence: Optional[float] = None


class PredictionUpdate(BaseModel):
    input: Optional[str] = None
    label: Optional[str] = None
    confidence: Optional[float] = None


class PredictionResponse(BaseModel):
    id: int
    input: str
    label: Optional[str] = None
    confidence: Optional[float] = None
    created_at: datetime
