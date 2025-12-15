# backend/main.py
from fastapi import FastAPI
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from database import engine 
from routers.auth_router import router as authrouter
from routers.chat_router import router as chatrouter
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()


app.include_router(authrouter)
app.include_router(chatrouter)

@app.on_event("startup")
def test_db_connection():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        print("✅ Neon PostgreSQL database connection successful!")
    except SQLAlchemyError as e:
        print(f"❌ Database connection failed: {e}")

@app.get("/")
def read_root():
    return {"message": "Hello, MediNova with Neon PostgreSQL!"}
