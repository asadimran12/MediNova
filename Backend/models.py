from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime
from database import Base  # Base from database.py

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)

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
