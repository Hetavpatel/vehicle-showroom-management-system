from uuid import UUID, uuid4

from fastapi import APIRouter, Depends, HTTPException, status

from ..dependencies import require_roles
from ..models import UserRole

router = APIRouter(prefix="/admin", tags=["admin"])

STAFF = [
    {
        "id": str(uuid4()),
        "name": "Jordan Blake",
        "email": "jordan@example.com",
        "role": "staff",
        "clinicianId": None,
    }
]


@router.get("/staff")
async def list_staff(_: None = Depends(require_roles(UserRole.ADMIN))):
    return STAFF


@router.post("/staff", status_code=status.HTTP_201_CREATED)
async def invite_staff(payload: dict, _: None = Depends(require_roles(UserRole.ADMIN))):
    staff = {
        "id": str(uuid4()),
        "name": payload["name"],
        "email": payload["email"],
        "role": payload.get("role", "staff"),
        "clinicianId": payload.get("clinicianId"),
    }
    STAFF.append(staff)
    return staff


@router.delete("/staff/{staff_id}", status_code=status.HTTP_204_NO_CONTENT)
async def deactivate_staff(staff_id: UUID, _: None = Depends(require_roles(UserRole.ADMIN))):
    for index, member in enumerate(STAFF):
        if member["id"] == str(staff_id):
            STAFF.pop(index)
            return None
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Staff member not found")
