import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    raise RuntimeError("MONGO_URI must be provided through the environment.")
DB_NAME = os.getenv("DB_NAME", "leomd317")

SECRET_KEY = os.getenv("SECRET_KEY", "")
if len(SECRET_KEY) < 32 or SECRET_KEY == "leo-md317-secret-key-change-in-production":
    raise RuntimeError(
        "SECRET_KEY must be a unique value of at least 32 characters. "
        "Set it in backend/.env or your deployment secret store."
    )

AUTH_TOKEN_TTL_SECONDS = int(os.getenv("AUTH_TOKEN_TTL_SECONDS", "28800"))
CORS_ORIGINS = [
    origin.strip()
    for origin in os.getenv(
        "CORS_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000"
    ).split(",")
    if origin.strip()
]
