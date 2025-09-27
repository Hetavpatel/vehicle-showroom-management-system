from datetime import datetime
from enum import Enum
from uuid import uuid4

from sqlalchemy import Column, DateTime, Enum as PgEnum, ForeignKey, Integer, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from .base import Base


class ReminderChannel(str, Enum):
    EMAIL = "email"
    SMS = "sms"


class ReminderStatus(str, Enum):
    SCHEDULED = "scheduled"
    SENT = "sent"
    FAILED = "failed"


class ReminderTemplate(Base):
    __tablename__ = "reminder_templates"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    name = Column(String(255), nullable=False)
    channel = Column(PgEnum(ReminderChannel, name="reminder_channel"), nullable=False)
    offset_minutes = Column(Integer, nullable=False)
    body = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)


class Reminder(Base):
    __tablename__ = "reminders"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    booking_id = Column(UUID(as_uuid=True), ForeignKey("bookings.id"), nullable=False)
    template_id = Column(UUID(as_uuid=True), ForeignKey("reminder_templates.id"), nullable=False)
    status = Column(PgEnum(ReminderStatus, name="reminder_status"), nullable=False, default=ReminderStatus.SCHEDULED)
    scheduled_for = Column(DateTime, nullable=False)
    sent_at = Column(DateTime)
    failure_reason = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    booking = relationship("Booking", back_populates="reminders")
    template = relationship("ReminderTemplate")
