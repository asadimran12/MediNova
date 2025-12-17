import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("NEONURL")
if not DATABASE_URL:
    raise ValueError("❌ NEONURL environment variable is not set.")

Base = declarative_base()

# Create engine with connection pool settings for Neon
# pre_ping: Check connection health before using it
# pool_recycle: Recycle connections after 300 seconds (5 min) to avoid stale connections
# pool_pre_ping: Test connections before checkout
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,  # Verify connections before using them
    pool_recycle=300,    # Recycle connections every 5 minutes
    pool_size=5,         # Connection pool size
    max_overflow=10,     # Max connections beyond pool_size
    connect_args={
        "connect_timeout": 10,  # Connection timeout in seconds
        "keepalives": 1,
        "keepalives_idle": 30,
        "keepalives_interval": 10,
        "keepalives_count": 5,
    }
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
