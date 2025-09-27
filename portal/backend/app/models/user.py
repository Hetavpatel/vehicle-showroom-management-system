from datetime import datetime
from enum import Enum
from uuid import uuid4

from sqlalchemy import Boolean, Column, DateTime, Enum as PgEnum, String
from sqlalchemy.dialects.postgresql import UUID

from .base import Base


class UserRole(str, Enum):
    ADMIN = "admin"
    STAFF = "staff"
    MEMBER = "member"


class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    email = Column(String(255), unique=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    name = Column(String(255), nullable=False)
    locale = Column(String(20), default="en-US")
    timezone = Column(String(64), default="UTC")
    avatar_url = Column(String(500))
    role = Column(PgEnum(UserRole, name="user_role"), nullable=False, default=UserRole.MEMBER)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
