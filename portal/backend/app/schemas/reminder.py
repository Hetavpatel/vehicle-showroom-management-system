from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel


class ReminderTemplateBase(BaseModel):
    id: UUID
    name: str
    channel: str
    offset_minutes: int
    body: str

    class Config:
        orm_mode = True


class ReminderTemplateUpsert(BaseModel):
    id: Optional[UUID]
    name: str
    channel: str
    offset_minutes: int
    body: str


class ReminderBase(BaseModel):
    id: UUID
    booking_id: UUID
    template_id: UUID
    status: str
    scheduled_for: datetime
    sent_at: Optional[datetime]

    class Config:
        orm_mode = True
