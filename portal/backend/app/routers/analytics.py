from datetime import datetime, timedelta

from fastapi import APIRouter, Depends

from ..dependencies import require_roles
from ..models import User, UserRole

router = APIRouter(prefix="/analytics", tags=["analytics"])


@router.get("/attendance")
async def get_attendance_trends(period: str = "30d", _: User = Depends(require_roles(UserRole.ADMIN, UserRole.STAFF))):
    days = 7 if period == "7d" else 30 if period == "30d" else 90
    end = datetime.utcnow()
    return [
        {
            "label": (end - timedelta(days=i)).strftime("%b %d"),
            "attendanceRate": 0.85 - i * 0.002,
            "noShowRate": 0.1 + i * 0.001,
        }
        for i in range(0, min(days, 10))
    ]


@router.get("/utilization")
async def get_utilization(_: User = Depends(require_roles(UserRole.ADMIN, UserRole.STAFF))):
    return [
        {"resourceId": "clinician-1", "resourceName": "Dr. Maya Lopez", "utilizationRate": 0.82},
        {"resourceId": "class-1", "resourceName": "Mobility Reset", "utilizationRate": 0.68},
    ]


@router.get("/suggestions")
async def get_suggestions(_: User = Depends(require_roles(UserRole.ADMIN, UserRole.STAFF))):
    return [
        {
            "resourceId": "clinician-1",
            "resourceType": "clinician",
            "recommendedSlots": [
                {"start": (datetime.utcnow() + timedelta(hours=24)).isoformat(), "probability": 0.74},
                {"start": (datetime.utcnow() + timedelta(hours=48)).isoformat(), "probability": 0.81},
            ],
        }
    ]
