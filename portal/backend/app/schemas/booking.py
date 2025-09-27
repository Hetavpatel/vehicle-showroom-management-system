from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, Field


class BookingBase(BaseModel):
    id: UUID
    member_id: UUID
    clinician_id: Optional[UUID]
    class_id: Optional[UUID]
    start: datetime = Field(alias="start_at")
    end: datetime = Field(alias="end_at")
    status: str
    notes: Optional[str]

    class Config:
        orm_mode = True
        allow_population_by_field_name = True


class BookingCreate(BaseModel):
    resource_type: str
    resource_id: UUID
    start: datetime
    end: datetime
    notes: Optional[str]


class BookingUpdate(BaseModel):
    start: Optional[datetime]
    end: Optional[datetime]
    status: Optional[str]
    notes: Optional[str]


class BookingCancel(BaseModel):
    reason: Optional[str]
