from datetime import datetime, timedelta

from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/availability", tags=["availability"])


@router.get("/{resource_type}/{resource_id}")
async def get_availability(resource_type: str, resource_id: str, date: str):
    if resource_type not in {"clinician", "class"}:
        raise HTTPException(status_code=400, detail="Unsupported resource type")
    normalized = date.replace('Z', '+00:00')
    day = datetime.fromisoformat(normalized)
    slots = []
    for hour in range(8, 17, 2):
        start = day.replace(hour=hour, minute=0)
        end = start + timedelta(minutes=50)
        slots.append({"start": start.isoformat(), "end": end.isoformat()})
    return slots
