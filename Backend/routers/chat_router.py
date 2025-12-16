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
        message_lower = request.message.lower()
        
        # Check for diet plan keywords
        is_diet_request = any(keyword in message_lower for keyword in [
            'diet plan', 'meal plan', 'diet', 'nutrition plan', 'eating plan',
            'food plan', 'weekly diet', 'daily diet', 'create diet', 'make diet'
        ])
        
        # Check for exercise plan keywords
        is_exercise_request = any(keyword in message_lower for keyword in [
            'exercise plan', 'workout plan', 'exercise', 'workout', 'fitness plan',
            'training plan', 'gym plan', 'create exercise', 'make workout'
        ])
        
        if is_diet_request:
            return {
                "response": "I can help you create a personalized diet plan! 🍽️\n\n" +
                           "To generate your diet plan:\n" +
                           "• Open the sidebar menu\n" +
                           "• Go to 'Diet Plan'\n" +
                           "• You'll find an AI-generated weekly meal plan with detailed nutrition information\n\n" +
                           "The diet plan includes breakfast, lunch, dinner, and snacks for all 7 days of the week!",
                "user_id": request.user_id,
                "plan_type": "diet"
            }
        
        if is_exercise_request:
            return {
                "response": "I can help you create a personalized exercise plan! 💪\n\n" +
                           "To generate your exercise plan:\n" +
                           "• Open the sidebar menu\n" +
                           "• Go to 'Exercise Plan'\n" +
                           "• You'll find an AI-generated weekly workout plan organized by category\n\n" +
                           "The plan includes Cardio, Strength, and Flexibility exercises for all 7 days!",
                "user_id": request.user_id,
                "plan_type": "exercise"
            }
        
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
        model = genai.GenerativeModel('gemini-2.5-flash')
        response = model.generate_content(full_prompt)
        
        return {
            "response": response.text,
            "user_id": request.user_id
        }
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
