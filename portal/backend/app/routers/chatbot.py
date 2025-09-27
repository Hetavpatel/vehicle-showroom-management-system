from fastapi import APIRouter

router = APIRouter(prefix="/chatbot", tags=["chatbot"])


@router.post("/query")
async def chatbot_query(payload: dict):
    messages = payload.get("messages", [])
    last_user_message = next((msg for msg in reversed(messages) if msg.get("role") == "user"), {})
    reply = "Thanks for reaching out. For appointments, please share preferred date, time, and reason for visit."
    if "injury" in last_user_message.get("content", "").lower():
        reply = "Please let us know the injury type, pain level, and if you have prior imaging before booking."
    return {"reply": reply, "followUp": ["Preferred date", "Preferred time", "Reason for visit"]}
