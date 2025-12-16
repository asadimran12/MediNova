from database import engine, Base
from models import User, DietPlan

# Create all tables
Base.metadata.create_all(bind=engine)

print("✅ Database tables created successfully!")
print("Tables: users, diet_plans")
