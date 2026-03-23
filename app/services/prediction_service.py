import threading
from datetime import datetime, timezone
from typing import Dict, List, Optional

from app.schemas.prediction import PredictionCreate, PredictionResponse, PredictionUpdate


class PredictionService:
    def __init__(self) -> None:
        self._store: Dict[int, PredictionResponse] = {}
        self._counter: int = 0
        self._lock = threading.Lock()

    def create(self, data: PredictionCreate) -> PredictionResponse:
        with self._lock:
            self._counter += 1
            prediction = PredictionResponse(
                id=self._counter,
                input=data.input,
                label=data.label,
                confidence=data.confidence,
                created_at=datetime.now(timezone.utc),
            )
            self._store[self._counter] = prediction
        return prediction

    def get_all(self) -> List[PredictionResponse]:
        with self._lock:
            return list(self._store.values())

    def get_by_id(self, prediction_id: int) -> Optional[PredictionResponse]:
        with self._lock:
            return self._store.get(prediction_id)

    def update(self, prediction_id: int, data: PredictionUpdate) -> Optional[PredictionResponse]:
        with self._lock:
            prediction = self._store.get(prediction_id)
            if prediction is None:
                return None
            updated = prediction.model_copy(
                update={k: v for k, v in data.model_dump().items() if v is not None}
            )
            self._store[prediction_id] = updated
        return updated

    def delete(self, prediction_id: int) -> bool:
        with self._lock:
            if prediction_id not in self._store:
                return False
            del self._store[prediction_id]
        return True


prediction_service = PredictionService()
