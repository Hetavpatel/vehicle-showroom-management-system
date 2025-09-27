from datetime import datetime
from uuid import UUID, uuid4

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ..dependencies import get_current_user, get_db_session
from ..models import Booking, BookingStatus, Clinician, FitnessClass, User, UserRole
from ..schemas.booking import BookingBase, BookingCancel, BookingCreate, BookingUpdate

router = APIRouter(prefix="/bookings", tags=["bookings"])


@router.get("", response_model=list[BookingBase])
async def list_bookings(
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_db_session),
) -> list[BookingBase]:
    query = select(Booking)
    if current_user.role == UserRole.MEMBER:
        query = query.where(Booking.member_id == current_user.id)
    result = await session.execute(query)
    bookings = result.scalars().all()
    return [BookingBase.from_orm(item) for item in bookings]


@router.post("", response_model=BookingBase, status_code=status.HTTP_201_CREATED)
async def create_booking(
    payload: BookingCreate,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_db_session),
) -> BookingBase:
    if payload.resource_type not in {"clinician", "class"}:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Unsupported resource type")

    start = payload.start
    end = payload.end
    if start >= end:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="End time must be after start time")

    booking = Booking(
        id=uuid4(),
        member_id=current_user.id,
        clinician_id=payload.resource_id if payload.resource_type == "clinician" else None,
        class_id=payload.resource_id if payload.resource_type == "class" else None,
        start_at=start,
        end_at=end,
        status=BookingStatus.BOOKED,
        notes=payload.notes,
    )
    session.add(booking)
    await session.flush()
    return BookingBase.from_orm(booking)


@router.patch("/{booking_id}", response_model=BookingBase)
async def update_booking(
    booking_id: UUID,
    payload: BookingUpdate,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_db_session),
) -> BookingBase:
    result = await session.execute(select(Booking).where(Booking.id == booking_id))
    booking = result.scalar_one_or_none()
    if not booking:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Booking not found")
    if current_user.role == UserRole.MEMBER and booking.member_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not allowed to update this booking")

    if payload.start:
        booking.start_at = payload.start
    if payload.end:
        if payload.start and payload.start >= payload.end:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="End time must be after start time")
        booking.end_at = payload.end
    if payload.status:
        booking.status = BookingStatus(payload.status)
    if payload.notes is not None:
        booking.notes = payload.notes

    await session.flush()
    return BookingBase.from_orm(booking)


@router.post("/{booking_id}/cancel", response_model=BookingBase)
async def cancel_booking(
    booking_id: UUID,
    _: BookingCancel,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_db_session),
) -> BookingBase:
    result = await session.execute(select(Booking).where(Booking.id == booking_id))
    booking = result.scalar_one_or_none()
    if not booking:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Booking not found")
    if current_user.role == UserRole.MEMBER and booking.member_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not allowed to cancel this booking")

    booking.status = BookingStatus.CANCELLED
    await session.flush()
    return BookingBase.from_orm(booking)
