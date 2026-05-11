import os
from datetime import timedelta

class Config:
    # ── Base de datos ──────────────────────────────────────────────────────────
    # Cambia los valores o usa variables de entorno para producción
    DB_USER     = os.getenv("DB_USER",     "root")
    DB_PASSWORD = os.getenv("DB_PASSWORD", "")
    DB_HOST     = os.getenv("DB_HOST",     "127.0.0.1")
    DB_PORT     = os.getenv("DB_PORT",     "3306")
    DB_NAME     = os.getenv("DB_NAME",     "tripcollab")

    SQLALCHEMY_DATABASE_URI = (
        f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # ── JWT ────────────────────────────────────────────────────────────────────
    JWT_SECRET_KEY          = os.getenv("JWT_SECRET_KEY", "CAMBIA_ESTA_CLAVE_EN_PRODUCCION")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=8)

    # ── General ────────────────────────────────────────────────────────────────
    DEBUG = os.getenv("FLASK_DEBUG", "True") == "True"