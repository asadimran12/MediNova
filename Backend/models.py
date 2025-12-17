from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime
from database import Base  # Base from database.py

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    token = Column(String, nullable=True, default=None)  # Authentication token
    
    # Profile fields
    phone = Column(String, nullable=True)
    age = Column(Integer, nullable=True)
    gender = Column(String, nullable=True)
    blood_type = Column(String, nullable=True)
    height = Column(Float, nullable=True)  # in cm
    weight = Column(Float, nullable=True)  # in kg
    allergies = Column(String, nullable=True)
    emergency_contact = Column(String, nullable=True)

class DietPlan(Base):
    __tablename__ = "diet_plans"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False, index=True)
    day = Column(String, nullable=False)  # Monday, Tuesday, etc.
    meal_type = Column(String, nullable=False)  # breakfast, lunch, dinner, snacks
    meal_name = Column(String, nullable=False)
    calories = Column(Float, nullable=False)
    protein = Column(Float, nullable=False)
    carbs = Column(Float, nullable=False)
    fat = Column(Float, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class ExercisePlan(Base):
    __tablename__ = "exercise_plans"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False, index=True)
    day = Column(String, nullable=False)  # Monday, Tuesday, etc.
    category = Column(String, nullable=False)  # Cardio, Strength, Flexibility
    exercise_name = Column(String, nullable=False)
    duration = Column(Integer, nullable=False)  # minutes
    calories = Column(Float, nullable=False)
    sets = Column(Integer, nullable=True)  # for strength training
    reps = Column(Integer, nullable=True)  # for strength training
    created_at = Column(DateTime, default=datetime.utcnow)
