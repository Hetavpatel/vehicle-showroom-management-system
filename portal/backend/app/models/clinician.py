from datetime import datetime
from uuid import uuid4

from sqlalchemy import Column, DateTime, String
from sqlalchemy.dialects.postgresql import ARRAY, UUID
from sqlalchemy.orm import relationship

from .base import Base


class Clinician(Base):
    __tablename__ = "clinicians"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    name = Column(String(255), nullable=False)
    specialty = Column(String(255), nullable=False)
    certifications = Column(ARRAY(String), default=list)
    languages = Column(ARRAY(String), default=list)
    bio = Column(String)
    avatar_url = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    classes = relationship("FitnessClass", back_populates="coach")
