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
    user_id: int = 1  # Default user ID

@router.post("/")
async def chat(request: ChatRequest):
    """Handle general chat conversations with Gemini AI"""
    if not GEMINI_API_KEY:
        raise HTTPException(status_code=500, detail="Gemini API key not configured")
    
    try:
        # Create a prompt that requests point-to-point answers
        system_instruction = """You are a helpful medical AI assistant. Provide concise, point-to-point answers.
        
Guidelines:
- Give clear, direct responses
- Use bullet points when listing multiple items
- Be brief but informative
- Focus on the most important information
- Avoid lengthy paragraphs

User Question: """
        
        full_prompt = system_instruction + request.message
        
        # Use Gemini AI for general health-related chat
        model = genai.GenerativeModel('gemini-2.0-flash-exp')
        response = model.generate_content(full_prompt)
        
        return {
            "response": response.text,
            "user_id": request.user_id
        }
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
