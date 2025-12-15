from fastapi import APIRouter, HTTPException, Depends
import google.generativeai as genai
import os
from pydantic import BaseModel
from dotenv import load_dotenv
from sqlalchemy.orm import Session
from database import SessionLocal
from models import DietPlan
import json

load_dotenv()

router = APIRouter(prefix="/chat", tags=["chat"])

# Configure the Gemini API
GEMINI_API_KEY = os.getenv("GEMINIAPI")
if not GEMINI_API_KEY:
    print("Warning: GEMINIAPI environment variable not set.")

genai.configure(api_key=GEMINI_API_KEY)

# Dependency: get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class ChatRequest(BaseModel):
    message: str
    user_id: int = 1  # Default user ID

@router.post("/")
async def chat(request: ChatRequest, db: Session = Depends(get_db)):
    if not GEMINI_API_KEY:
        raise HTTPException(status_code=500, detail="Gemini API key not configured")
    
    try:
        # Check if user is asking for a diet plan
        message_lower = request.message.lower()
        is_diet_request = any(keyword in message_lower for keyword in [
            'diet plan', 'meal plan', 'diet', 'nutrition plan', 'eating plan',
            'food plan', 'weekly diet', 'daily diet'
        ])
        
        if is_diet_request:
            # Generate diet plan
            diet_prompt = f"""Generate a healthy, balanced 7-day diet plan for one week (Monday to Sunday).
            
            For each day, provide:
            - Breakfast: 2 meal items
            - Lunch: 2 meal items  
            - Dinner: 2 meal items
            - Snacks: 2 meal items
            
            For each meal item, include: name, calories (number), protein (g), carbs (g), fat (g)
            
            Return ONLY valid JSON in this exact format:
            {{
                "Monday": {{
                    "breakfast": [{{"name": "...", "calories": 320, "protein": 12, "carbs": 54, "fat": 6}}, ...],
                    "lunch": [...],
                    "dinner": [...],
                    "snacks": [...]
                }},
                ... (for all 7 days)
            }}
            
            Keep meal names simple and realistic. Ensure nutritional values are accurate."""
            
            model = genai.GenerativeModel('gemini-2.5-flash')
            diet_response = model.generate_content(diet_prompt)
            
            # Parse response
            response_text = diet_response.text.strip()
            if response_text.startswith("```"):
                response_text = response_text.split("```")[1]
                if response_text.startswith("json"):
                    response_text = response_text[4:]
                response_text = response_text.strip()
            
            diet_plan = json.loads(response_text)
            
            # Delete old plan
            db.query(DietPlan).filter(DietPlan.user_id == request.user_id).delete()
            db.commit()
            
            # Save new plan to database
            for day, meals in diet_plan.items():
                for meal_type, meal_items in meals.items():
                    for meal in meal_items:
                        diet_entry = DietPlan(
                            user_id=request.user_id,
                            day=day,
                            meal_type=meal_type,
                            meal_name=meal["name"],
                            calories=meal["calories"],
                            protein=meal["protein"],
                            carbs=meal["carbs"],
                            fat=meal["fat"]
                        )
                        db.add(diet_entry)
            db.commit()
            
            return {
                "response": "I've created a personalized 7-day diet plan for you! 🍽️\n\nYour meal plan includes breakfast, lunch, dinner, and snacks for each day of the week, with detailed nutritional information.\n\nYou can view your complete diet plan by navigating to the Diet Plan page from the sidebar menu. The plan has been saved to your account.",
                "diet_plan_generated": True
            }
        else:
            # Regular chat response
            model = genai.GenerativeModel('gemini-2.5-flash')
            response = model.generate_content(request.message)
            return {"response": response.text, "diet_plan_generated": False}
            
    except json.JSONDecodeError as e:
        # If JSON parsing fails, return error but continue chat
        return {
            "response": "I tried to create a diet plan but encountered an issue. Please try asking again.",
            "diet_plan_generated": False
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
