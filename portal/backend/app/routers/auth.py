from datetime import timedelta
from typing import Any
from uuid import UUID, uuid4

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ..core.config import get_settings
from ..dependencies import get_current_user, get_db_session
from ..models import User, UserRole
from ..schemas.user import (
    AuthResponse,
    OAuthLogin,
    RefreshResponse,
    TokenPair,
    UserCreate,
    UserLogin,
    UserPublic,
)
from ..utils.security import create_token, hash_password, verify_password, verify_token

router = APIRouter(prefix="/auth", tags=["auth"])
settings = get_settings()


@router.post("/register", response_model=UserPublic, status_code=status.HTTP_201_CREATED)
async def register_user(payload: UserCreate, session: AsyncSession = Depends(get_db_session)) -> Any:
    result = await session.execute(select(User).where(User.email == payload.email))
    if result.scalar_one_or_none():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    user = User(
        id=uuid4(),
        email=payload.email,
        hashed_password=hash_password(payload.password),
        name=payload.name,
        locale=payload.locale,
        timezone=payload.timezone,
        role=UserRole.ADMIN,
    )
    session.add(user)
    await session.flush()
    return UserPublic.from_orm(user)


@router.post("/login", response_model=AuthResponse)
async def login_user(payload: UserLogin, session: AsyncSession = Depends(get_db_session)) -> Any:
    result = await session.execute(select(User).where(User.email == payload.email))
    user = result.scalar_one_or_none()
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect email or password")

    access_token = create_token(str(user.id), timedelta(minutes=settings.access_token_expire_minutes), settings.secret_key)
    refresh_token = create_token(
        str(user.id), timedelta(minutes=settings.refresh_token_expire_minutes), settings.refresh_secret_key
    )
    return AuthResponse(user=UserPublic.from_orm(user), access_token=access_token, refresh_token=refresh_token)


@router.post("/oauth", response_model=AuthResponse)
async def oauth_login(_: OAuthLogin) -> Any:
    fake_user = UserPublic(
        id=uuid4(),
        email="oauth@example.com",
        name="OAuth User",
        locale="en-US",
        timezone="UTC",
        avatar_url=None,
        role="member",
    )
    access_token = create_token(str(fake_user.id), timedelta(minutes=settings.access_token_expire_minutes), settings.secret_key)
    refresh_token = create_token(
        str(fake_user.id), timedelta(minutes=settings.refresh_token_expire_minutes), settings.refresh_secret_key
    )
    return AuthResponse(user=fake_user, access_token=access_token, refresh_token=refresh_token)


@router.post("/refresh", response_model=RefreshResponse)
async def refresh_token_endpoint(payload: TokenPair, session: AsyncSession = Depends(get_db_session)) -> Any:
    subject = verify_token(payload.refresh_token, settings.refresh_secret_key)
    if not subject:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")
    result = await session.execute(select(User).where(User.id == UUID(subject)))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Account not found")
    new_access = create_token(subject, timedelta(minutes=settings.access_token_expire_minutes), settings.secret_key)
    return RefreshResponse(user=UserPublic.from_orm(user), access_token=new_access)


@router.get("/profile", response_model=UserPublic)
async def get_profile(current_user: User = Depends(get_current_user)) -> Any:
    return UserPublic.from_orm(current_user)


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
async def logout_user() -> Any:
    return Response(status_code=status.HTTP_204_NO_CONTENT)
