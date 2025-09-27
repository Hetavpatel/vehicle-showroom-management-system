from datetime import timedelta
from typing import Optional
from uuid import UUID

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from .core.config import get_settings
from .database import get_session
from .models import User, UserRole
from .utils.security import verify_token

settings = get_settings()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.api_prefix}/auth/login")


async def get_db_session() -> AsyncSession:
    async with get_session() as session:
        yield session


async def get_current_user(token: str = Depends(oauth2_scheme), session: AsyncSession = Depends(get_db_session)) -> User:
    subject = verify_token(token, settings.secret_key)
    if not subject:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authentication credentials")

    result = await session.execute(select(User).where(User.id == UUID(subject)))
    user = result.scalar_one_or_none()
    if not user or not user.is_active:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Inactive account")
    return user


def require_roles(*roles: UserRole):
    async def _checker(user: User = Depends(get_current_user)) -> User:
        if roles and user.role not in roles:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient permissions")
        return user

    return _checker
