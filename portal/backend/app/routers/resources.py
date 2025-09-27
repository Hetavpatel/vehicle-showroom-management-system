from uuid import uuid4

from fastapi import APIRouter

router = APIRouter(prefix="/resources", tags=["resources"])


@router.get("/clinicians")
async def list_clinicians():
    return [
        {
            "id": str(uuid4()),
            "name": "Dr. Maya Lopez",
            "specialty": "Physical Therapist",
            "certifications": ["DPT", "OCS"],
            "bio": "Specializes in sports injury recovery and prenatal care.",
            "languages": ["en"],
        },
        {
            "id": str(uuid4()),
            "name": "Alex Rivera",
            "specialty": "Strength Coach",
            "certifications": ["CSCS"],
            "bio": "Helps athletes boost power output and prevent injury.",
            "languages": ["en", "es"],
        },
    ]


@router.get("/classes")
async def list_classes():
    return [
        {
            "id": str(uuid4()),
            "name": "Mobility Reset",
            "description": "30-minute guided mobility flow for all levels.",
            "coachId": str(uuid4()),
            "capacity": 10,
            "durationMinutes": 30,
            "tags": ["mobility", "recovery"],
        },
        {
            "id": str(uuid4()),
            "name": "Strength Foundations",
            "description": "Small-group strength session with form coaching.",
            "coachId": str(uuid4()),
            "capacity": 12,
            "durationMinutes": 45,
            "tags": ["strength", "hypertrophy"],
        },
    ]
