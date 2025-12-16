from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models import ExercisePlan
from pydantic import BaseModel
from typing import List, Optional
import google.generativeai as genai
import os
from dotenv import load_dotenv
import json

load_dotenv()

router = APIRouter(prefix="/exercise", tags=["exercise"])

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
class ExerciseItem(BaseModel):
    exercise_name: str
    duration: int
    calories: float
    sets: Optional[int] = None
    reps: Optional[int] = None

class GenerateExerciseRequest(BaseModel):
    user_id: int
    preferences: str = ""  # e.g., "beginner, no equipment"

@router.post("/generate")
async def generate_exercise_plan(request: GenerateExerciseRequest):
    """Generate a personalized exercise plan using Gemini AI"""
    if not GEMINI_API_KEY:
        raise HTTPException(status_code=500, detail="Gemini API key not configured")
    
    try:
        prompt = f"""Generate a comprehensive 7-day exercise plan for one week (Monday to Sunday).
        User preferences: {request.preferences if request.preferences else 'Balanced workout for general fitness'}
        
        For each day, provide exercises in these categories:
        - Cardio: 2 exercises
        - Strength: 2 exercises
        - Flexibility: 1 exercise
        
        For each exercise, include:
        - exercise_name: name of the exercise
        - duration: time in minutes
        - calories: estimated calories burned
        - sets: number of sets (for strength exercises, null for others)
        - reps: repetitions per set (for strength exercises, null for others)
        
        Return ONLY valid JSON in this exact format:
        {{
            "Monday": {{
                "Cardio": [
                    {{"exercise_name": "Running", "duration": 20, "calories": 200, "sets": null, "reps": null}},
                    {{"exercise_name": "Jump Rope", "duration": 10, "calories": 100, "sets": null, "reps": null}}
                ],
                "Strength": [
                    {{"exercise_name": "Push-ups", "duration": 10, "calories": 50, "sets": 3, "reps": 15}},
                    {{"exercise_name": "Squats", "duration": 10, "calories": 60, "sets": 3, "reps": 20}}
                ],
                "Flexibility": [
                    {{"exercise_name": "Yoga Stretches", "duration": 15, "calories": 30, "sets": null, "reps": null}}
                ]
            }},
            ... (for all 7 days)
        }}
        
        Make exercises realistic and achievable. Vary the exercises across the week."""
        
        model = genai.GenerativeModel('gemini-2.0-flash-exp')
        response = model.generate_content(prompt)
        
        # Parse the response
        response_text = response.text.strip()
        # Remove markdown code blocks if present
        if response_text.startswith("```"):
            response_text = response_text.split("```")[1]
            if response_text.startswith("json"):
                response_text = response_text[4:]
            response_text = response_text.strip()
        
        exercise_plan = json.loads(response_text)
        
        return {"success": True, "exercise_plan": exercise_plan}
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse AI response: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{user_id}")
def get_exercise_plan(user_id: int, db: Session = Depends(get_db)):
    """Retrieve exercise plan for a user"""
    exercises = db.query(ExercisePlan).filter(ExercisePlan.user_id == user_id).all()
    
    if not exercises:
        return {"success": False, "message": "No exercise plan found"}
    
    # Group exercises by day and category
    exercise_plan = {}
    for exercise in exercises:
        if exercise.day not in exercise_plan:
            exercise_plan[exercise.day] = {"Cardio": [], "Strength": [], "Flexibility": []}
        
        exercise_plan[exercise.day][exercise.category].append({
            "exercise_name": exercise.exercise_name,
            "duration": exercise.duration,
            "calories": exercise.calories,
            "sets": exercise.sets,
            "reps": exercise.reps
        })
    
    return {"success": True, "exercise_plan": exercise_plan}

@router.delete("/{user_id}")
def delete_exercise_plan(user_id: int, db: Session = Depends(get_db)):
    """Delete all exercise plan entries for a user"""
    db.query(ExercisePlan).filter(ExercisePlan.user_id == user_id).delete()
    db.commit()
    return {"success": True, "message": "Exercise plan deleted"}
