from .database import Base, engine
from . import models 

def init_db():
    try:
        # This creates the tables (users, etc.) if they don't exist
        print("🔧 Attempting to create database tables...")
        print(f"📋 Models to create: {[table.name for table in Base.metadata.tables.values()]}")
        Base.metadata.create_all(bind=engine)
        print("✅ Database tables created successfully!")
        
        # Verify tables were created
        from sqlalchemy import inspect
        inspector = inspect(engine)
        tables = inspector.get_table_names()
        print(f"📊 Existing tables: {tables}")
    except Exception as e:
        # This print will show up in 'adb logcat' if something goes wrong
        print(f"❌ Error creating database tables: {e}")
        import traceback
        traceback.print_exc()
        raise