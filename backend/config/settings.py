# import os
# from datetime import timedelta


# class Config:
#     """
#     Configuración general de la aplicación Flask.
#     Incluye configuración de base de datos, JWT y parámetros globales.
#     """

#     # ─────────────────────────────────────────────────────────────
#     # BASE DE DATOS (SQLite)
#     # ─────────────────────────────────────────────────────────────
#     # Se utiliza SQLite como base de datos local basada en archivo.
#     # Es ideal para desarrollo, pruebas y proyectos académicos (TFG).
#     # El archivo 'database.db' se crea automáticamente en el directorio del proyecto.
#     BASE_DIR = os.path.abspath(os.path.dirname(__file__))

#     SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(BASE_DIR, "database.db")

#     # Desactiva el tracking de modificaciones para mejorar rendimiento
#     # y evitar advertencias innecesarias de SQLAlchemy.
#     SQLALCHEMY_TRACK_MODIFICATIONS = False

#     # ─────────────────────────────────────────────────────────────
#     # AUTENTICACIÓN JWT
#     # ─────────────────────────────────────────────────────────────
#     # Clave secreta utilizada para firmar tokens JWT.
#     # En producción debe almacenarse en variables de entorno.
#     JWT_SECRET_KEY = os.getenv(
#         "JWT_SECRET_KEY",
#         "CAMBIA_ESTA_CLAVE_EN_PRODUCCION"
#     )

#     # Tiempo de expiración de los tokens de acceso (8 horas)
#     JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=8)

#     # ─────────────────────────────────────────────────────────────
#     # CONFIGURACIÓN GENERAL
#     # ─────────────────────────────────────────────────────────────
#     # Activa o desactiva el modo debug según variable de entorno.
#     # En producción debe estar en False.
#     DEBUG = os.getenv("FLASK_DEBUG", "True") == "True"

import os
from datetime import timedelta


class Config:
    """
    Configuración general de Flask
    """

    # ─────────────────────────────────────────────
    # BASE DE DATOS MYSQL (XAMPP)
    # ─────────────────────────────────────────────

    DB_USER = "root"
    DB_PASSWORD = ""   # En XAMPP normalmente está vacío
    DB_HOST = "localhost"
    DB_PORT = "3306"
    DB_NAME = "tripcollab"

    SQLALCHEMY_DATABASE_URI = (
        f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}"
        f"@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # ─────────────────────────────────────────────
    # JWT
    # ─────────────────────────────────────────────

    JWT_SECRET_KEY = os.getenv(
        "JWT_SECRET_KEY",
        "CAMBIA_ESTA_CLAVE_EN_PRODUCCION"
    )

    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=8)

    # ─────────────────────────────────────────────
    # GENERAL
    # ─────────────────────────────────────────────

    DEBUG = os.getenv("FLASK_DEBUG", "True") == "True"