from datetime import datetime
from enum import Enum
from uuid import uuid4

from sqlalchemy import Column, DateTime, Enum as PgEnum, ForeignKey, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from .base import Base


class BookingStatus(str, Enum):
    BOOKED = "booked"
    CHECKED_IN = "checked_in"
    COMPLETED = "completed"
    CANCELLED = "cancelled"
    NO_SHOW = "no_show"


class Booking(Base):
    __tablename__ = "bookings"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    member_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    clinician_id = Column(UUID(as_uuid=True), ForeignKey("clinicians.id"))
    class_id = Column(UUID(as_uuid=True), ForeignKey("fitness_classes.id"))
    start_at = Column(DateTime, nullable=False)
    end_at = Column(DateTime, nullable=False)
    status = Column(PgEnum(BookingStatus, name="booking_status"), nullable=False, default=BookingStatus.BOOKED)
    notes = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    member = relationship("User")
    clinician = relationship("Clinician")
    fitness_class = relationship("FitnessClass", back_populates="bookings")
    reminders = relationship("Reminder", back_populates="booking")
