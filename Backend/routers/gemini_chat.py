from fastapi import APIRouter, HTTPException
import google.generativeai as genai
import os
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/chat", tags=["chat"])

# Configure the Gemini API
GEMINI_API_KEY = os.getenv("GEMINIAPI")
if not GEMINI_API_KEY:
    print("Warning: GEMINIAPI environment variable not set.")

genai.configure(api_key=GEMINI_API_KEY)

class ChatRequest(BaseModel):
    message: str

@router.post("/")
async def chat(request: ChatRequest):
    if not GEMINI_API_KEY:
        raise HTTPException(status_code=500, detail="Gemini API key not configured")
    
    try:
        model = genai.GenerativeModel('gemini-2.0-flash')
        response = model.generate_content(request.message)
        return {"response": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
