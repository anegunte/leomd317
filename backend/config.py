import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb+srv://mdleo_db_user:mdmongo@leo.i0xnahi.mongodb.net/")
DB_NAME = os.getenv("DB_NAME", "leomd317")

# Static admin credentials (will be replaced with proper auth later)
ADMIN_USERS = [
    {"username": "superadmin", "password": "password123", "name": "Leo Lion A Vaishnavi mjf", "role": "Super Admin", "district": "317"},
    {"username": "mdadmin", "password": "password123", "name": "Leo Lion A Vaishnavi mjf", "role": "MD Admin", "district": "317"},
    {"username": "distadmin317a", "password": "password123", "name": "Leo Shruthi K.R.", "role": "District Admin", "district": "317A"},
    {"username": "clubadminrvce", "password": "password123", "name": "Leo Chethan M.", "role": "Club Admin", "district": "317A", "club": "Leo Club of RVCE"},
]

SECRET_KEY = os.getenv("SECRET_KEY", "leo-md317-secret-key-change-in-production")
