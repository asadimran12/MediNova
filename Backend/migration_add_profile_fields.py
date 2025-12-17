"""
Migration script to add profile fields to users table
Run this once to add new columns to existing users table in Neon PostgreSQL
"""
from sqlalchemy import text
from database import engine
import sys

def run_migration():
    """Add profile fields to users table"""
    
    migration_sql = """
    ALTER TABLE users 
    ADD COLUMN IF NOT EXISTS phone VARCHAR,
    ADD COLUMN IF NOT EXISTS age INTEGER,
    ADD COLUMN IF NOT EXISTS gender VARCHAR,
    ADD COLUMN IF NOT EXISTS blood_type VARCHAR,
    ADD COLUMN IF NOT EXISTS height FLOAT,
    ADD COLUMN IF NOT EXISTS weight FLOAT,
    ADD COLUMN IF NOT EXISTS allergies VARCHAR,
    ADD COLUMN IF NOT EXISTS emergency_contact VARCHAR;
    """
    
    try:
        print("🔄 Starting migration: Adding profile fields to users table...")
        
        with engine.connect() as connection:
            connection.execute(text(migration_sql))
            connection.commit()
        
        print("✅ Migration completed successfully!")
        print("   Added columns:")
        print("   - phone (VARCHAR)")
        print("   - age (INTEGER)")
        print("   - gender (VARCHAR)")
        print("   - blood_type (VARCHAR)")
        print("   - height (FLOAT)")
        print("   - weight (FLOAT)")
        print("   - allergies (VARCHAR)")
        print("   - emergency_contact (VARCHAR)")
        
        return True
        
    except Exception as e:
        print(f"❌ Migration failed: {str(e)}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = run_migration()
    sys.exit(0 if success else 1)
