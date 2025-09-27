from uuid import UUID

from pydantic import BaseModel, EmailStr, Field

from .common import UserBase


class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str = Field(min_length=12)
    locale: str
    timezone: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class OAuthLogin(BaseModel):
    provider: str
    token: str


class UserPublic(UserBase):
    pass


class TokenPair(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class AuthResponse(BaseModel):
    user: UserPublic
    access_token: str
    refresh_token: str


class RefreshResponse(BaseModel):
    user: UserPublic
    access_token: str


class StaffInvite(BaseModel):
    id: UUID
    name: str
    email: EmailStr
    role: str
    clinician_id: UUID | None

    class Config:
        orm_mode = True
