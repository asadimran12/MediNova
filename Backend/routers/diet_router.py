from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models import DietPlan
from pydantic import BaseModel
from typing import List
import google.generativeai as genai
import os
from dotenv import load_dotenv
import json

load_dotenv()

router = APIRouter(prefix="/diet", tags=["diet"])

# Configure Gemini API
GEMINI_API_KEY = os.getenv("GEMINIAPI")
genai.configure(api_key=GEMINI_API_KEY)

# Dependency: get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic models
class MealItem(BaseModel):
    name: str
    calories: float
    protein: float
    carbs: float
    fat: float

class DayPlan(BaseModel):
    breakfast: List[MealItem]
    lunch: List[MealItem]
    dinner: List[MealItem]
    snacks: List[MealItem]

class GenerateDietRequest(BaseModel):
    user_id: int
    preferences: str = ""  # e.g., "vegetarian, low carb"

class SaveDietRequest(BaseModel):
    user_id: int
    day: str
    meal_type: str
    meal_name: str
    calories: float
    protein: float
    carbs: float
    fat: float

@router.post("/generate")
async def generate_diet_plan(request: GenerateDietRequest):
    """Generate a personalized diet plan using Gemini AI"""
    if not GEMINI_API_KEY:
        raise HTTPException(status_code=500, detail="Gemini API key not configured")
    
    try:
        prompt = f"""Generate a healthy, balanced 7-day diet plan for one week (Monday to Sunday).
        User preferences: {request.preferences if request.preferences else 'None'}
        
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
        response = model.generate_content(prompt)
        
        # Parse the response
        response_text = response.text.strip()
        # Remove markdown code blocks if present
        if response_text.startswith("```"):
            response_text = response_text.split("```")[1]
            if response_text.startswith("json"):
                response_text = response_text[4:]
            response_text = response_text.strip()
        
        diet_plan = json.loads(response_text)
        
        return {"success": True, "diet_plan": diet_plan}
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse AI response: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/save")
def save_diet_meal(meal: SaveDietRequest, db: Session = Depends(get_db)):
    """Save a single meal to the database"""
    diet_entry = DietPlan(
        user_id=meal.user_id,
        day=meal.day,
        meal_type=meal.meal_type,
        meal_name=meal.meal_name,
        calories=meal.calories,
        protein=meal.protein,
        carbs=meal.carbs,
        fat=meal.fat
    )
    db.add(diet_entry)
    db.commit()
    db.refresh(diet_entry)
    return {"success": True, "id": diet_entry.id}

@router.get("/{user_id}")
def get_diet_plan(user_id: int, db: Session = Depends(get_db)):
    """Retrieve diet plan for a user"""
    meals = db.query(DietPlan).filter(DietPlan.user_id == user_id).all()
    
    if not meals:
        return {"success": False, "message": "No diet plan found"}
    
    # Group meals by day and meal type
    diet_plan = {}
    for meal in meals:
        if meal.day not in diet_plan:
            diet_plan[meal.day] = {"breakfast": [], "lunch": [], "dinner": [], "snacks": []}
        
        diet_plan[meal.day][meal.meal_type].append({
            "name": meal.meal_name,
            "calories": meal.calories,
            "protein": meal.protein,
            "carbs": meal.carbs,
            "fat": meal.fat
        })
    
    return {"success": True, "diet_plan": diet_plan}

@router.delete("/{user_id}")
def delete_diet_plan(user_id: int, db: Session = Depends(get_db)):
    """Delete all diet plan entries for a user"""
    db.query(DietPlan).filter(DietPlan.user_id == user_id).delete()
    db.commit()
    return {"success": True, "message": "Diet plan deleted"}
