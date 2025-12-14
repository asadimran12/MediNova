# backend/database.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Neon PostgreSQL connection URL
DATABASE_URL = (
    "postgresql://neondb_owner:npg_hrYSM3kNwCq7@ep-lucky-wildflower-a12fhgh1-pooler.ap-southeast-1.aws.neon.tech/"
    "neondb?sslmode=require&channel_binding=require"
)

Base = declarative_base()

# Create engine & session
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
