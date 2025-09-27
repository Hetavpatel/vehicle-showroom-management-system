from datetime import datetime
from typing import List

from pydantic import BaseModel


class AttendanceTrend(BaseModel):
    label: str
    attendance_rate: float
    no_show_rate: float


class UtilizationSnapshot(BaseModel):
    resource_id: str
    resource_name: str
    utilization_rate: float


class PredictiveSlot(BaseModel):
    start: datetime
    probability: float


class PredictiveSuggestion(BaseModel):
    resource_id: str
    resource_type: str
    recommended_slots: List[PredictiveSlot]
