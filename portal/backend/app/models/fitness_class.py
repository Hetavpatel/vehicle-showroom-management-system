from datetime import datetime
from uuid import uuid4

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.dialects.postgresql import ARRAY, UUID
from sqlalchemy.orm import relationship

from .base import Base


class FitnessClass(Base):
    __tablename__ = "fitness_classes"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    name = Column(String(255), nullable=False)
    description = Column(String, nullable=False)
    coach_id = Column(UUID(as_uuid=True), ForeignKey("clinicians.id"), nullable=False)
    capacity = Column(Integer, nullable=False)
    duration_minutes = Column(Integer, nullable=False)
    tags = Column(ARRAY(String), default=list)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    coach = relationship("Clinician", back_populates="classes")
    bookings = relationship("Booking", back_populates="fitness_class")
