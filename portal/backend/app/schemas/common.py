from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, EmailStr


class Timestamped(BaseModel):
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    id: UUID
    email: EmailStr
    name: str
    locale: str
    timezone: str
    avatar_url: Optional[str]
    role: str

    class Config:
        orm_mode = True
