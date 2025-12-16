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
async def generate_exercise_plan(request: GenerateExerciseRequest, db: Session = Depends(get_db)):
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
        
        model = genai.GenerativeModel('gemini-2.5-flash')
        response = model.generate_content(prompt)
        
        # Log raw response for debugging
        print("="*50)
        print("RAW GEMINI RESPONSE:")
        print(response.text)
        print("="*50)
        
        # Parse the response
        response_text = response.text.strip()
        # Remove markdown code blocks if present
        if response_text.startswith("```"):
            response_text = response_text.split("```")[1]
            if response_text.startswith("json"):
                response_text = response_text[4:]
            response_text = response_text.strip()
        
        print("CLEANED RESPONSE:")
        print(response_text[:500])  # Print first 500 chars
        print("="*50)
        
        try:
            exercise_plan = json.loads(response_text)
        except json.JSONDecodeError as json_err:
            print(f"JSON Parse Error: {json_err}")
            print(f"Attempted to parse: {response_text[:200]}")
            raise HTTPException(
                status_code=500, 
                detail=f"Failed to parse AI response as JSON. AI returned invalid format. Error: {str(json_err)}"
            )
        
        # Validate structure
        if not isinstance(exercise_plan, dict):
            raise HTTPException(status_code=500, detail="AI response is not a valid exercise plan structure")
        
        # Delete old plan for this user
        db.query(ExercisePlan).filter(ExercisePlan.user_id == request.user_id).delete()
        db.commit()
        
        # Save new plan to database
        saved_count = 0
        for day, categories in exercise_plan.items():
            for category, exercises in categories.items():
                for exercise in exercises:
                    exercise_entry = ExercisePlan(
                        user_id=request.user_id,
                        day=day,
                        category=category,
                        exercise_name=exercise["exercise_name"],
                        duration=exercise["duration"],
                        calories=exercise["calories"],
                        sets=exercise.get("sets"),
                        reps=exercise.get("reps")
                    )
                    db.add(exercise_entry)
                    saved_count += 1
        db.commit()
        
        print(f"✅ Saved {saved_count} exercises to database for user {request.user_id}")
        
        return {"success": True, "exercise_plan": exercise_plan, "saved_count": saved_count}
    except json.JSONDecodeError as e:
        print(f"❌ JSON Decode Error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to parse AI response: {str(e)}")
    except Exception as e:
        print(f"❌ General Error: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Error generating exercise plan: {str(e)}")

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
