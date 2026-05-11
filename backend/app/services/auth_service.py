"""
Servicios de autenticación: registro, login, validación.
"""
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash
from app import db
from app.models.models import Usuario


class AuthService:

    @staticmethod
    def registrar(nombre: str, email: str, password: str) -> dict:
        if Usuario.query.filter_by(email=email).first():
            raise ValueError("Ya existe un usuario con ese email.")

        hashed = generate_password_hash(password)
        nuevo = Usuario(nombre=nombre, email=email, password_hash=hashed)
        db.session.add(nuevo)
        db.session.commit()
        return {"mensaje": "Usuario registrado correctamente"}

    @staticmethod
    def login(email: str, password: str) -> dict:
        usuario = Usuario.query.filter_by(email=email).first()
        if not usuario or not check_password_hash(usuario.password_hash, password):
            raise ValueError("Credenciales incorrectas.")

        token = create_access_token(identity=str(usuario.id_usuario))
        return {
            "token": token,
            "usuario": {"id_usuario": usuario.id_usuario, "nombre": usuario.nombre},
        }