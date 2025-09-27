from datetime import datetime, timedelta
from uuid import UUID, uuid4

from fastapi import APIRouter, Depends, HTTPException, status

from ..dependencies import get_current_user
from ..models import User
from ..schemas.reminder import ReminderBase, ReminderTemplateBase, ReminderTemplateUpsert

router = APIRouter(prefix="/reminders", tags=["reminders"])

TEMPLATES: dict[UUID, ReminderTemplateBase] = {}
REMINDERS: dict[UUID, list[ReminderBase]] = {}


@router.get("/templates", response_model=list[ReminderTemplateBase])
async def list_templates(_: User = Depends(get_current_user)) -> list[ReminderTemplateBase]:
    if not TEMPLATES:
        default_template = ReminderTemplateBase(
            id=uuid4(),
            name="24h Email",
            channel="email",
            offset_minutes=1440,
            body="Hi {{name}}, see you tomorrow for your appointment!",
        )
        TEMPLATES[default_template.id] = default_template
    return list(TEMPLATES.values())


@router.put("/templates/{template_id}", response_model=ReminderTemplateBase)
async def upsert_template(
    template_id: str,
    payload: ReminderTemplateUpsert,
    _: User = Depends(get_current_user),
) -> ReminderTemplateBase:
    try:
        template_uuid = UUID(template_id)
    except ValueError:
        template_uuid = uuid4()
    template = ReminderTemplateBase(
        id=template_uuid,
        name=payload.name,
        channel=payload.channel,
        offset_minutes=payload.offset_minutes,
        body=payload.body,
    )
    TEMPLATES[template.id] = template
    return template


@router.get("/{booking_id}", response_model=list[ReminderBase])
async def list_booking_reminders(booking_id: UUID, _: User = Depends(get_current_user)) -> list[ReminderBase]:
    return REMINDERS.get(booking_id, [])


@router.post("/{booking_id}", response_model=ReminderBase, status_code=status.HTTP_201_CREATED)
async def schedule_reminder(
    booking_id: UUID,
    payload: dict,
    _: User = Depends(get_current_user),
) -> ReminderBase:
    template_id = UUID(payload.get("templateId") or payload.get("template_id"))
    template = TEMPLATES.get(template_id)
    if not template:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Template not found")

    reminder = ReminderBase(
        id=uuid4(),
        booking_id=booking_id,
        template_id=template_id,
        status="scheduled",
        scheduled_for=datetime.utcnow() + timedelta(minutes=template.offset_minutes),
        sent_at=None,
    )
    REMINDERS.setdefault(booking_id, []).append(reminder)
    return reminder
