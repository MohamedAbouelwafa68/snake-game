from typing import List

from fastapi import APIRouter, HTTPException

from app.schemas.prediction import PredictionCreate, PredictionResponse, PredictionUpdate
from app.services.prediction_service import prediction_service

router = APIRouter(prefix="/predictions", tags=["predictions"])


@router.post("/", response_model=PredictionResponse, status_code=201)
def create_prediction(data: PredictionCreate):
    return prediction_service.create(data)


@router.get("/", response_model=List[PredictionResponse])
def list_predictions():
    return prediction_service.get_all()


@router.get("/{prediction_id}", response_model=PredictionResponse)
def get_prediction(prediction_id: int):
    prediction = prediction_service.get_by_id(prediction_id)
    if prediction is None:
        raise HTTPException(status_code=404, detail="Prediction not found")
    return prediction


@router.put("/{prediction_id}", response_model=PredictionResponse)
def update_prediction(prediction_id: int, data: PredictionUpdate):
    prediction = prediction_service.update(prediction_id, data)
    if prediction is None:
        raise HTTPException(status_code=404, detail="Prediction not found")
    return prediction


@router.delete("/{prediction_id}", status_code=204)
def delete_prediction(prediction_id: int):
    deleted = prediction_service.delete(prediction_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Prediction not found")
