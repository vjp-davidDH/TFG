"""
Servicios de autenticación: registro, login, validación.
"""
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash
from app import db
from app.models.models import Usuario


class AuthService:

    @staticmethod
    def registrar(nombre: str, email: str, password: str, telefono: str = None) -> dict:
        if Usuario.query.filter_by(email=email).first():
            raise ValueError("Ya existe un usuario con ese email.")

        hashed = generate_password_hash(password)
        nuevo = Usuario(nombre=nombre, email=email, password_hash=hashed, telefono=telefono)
        db.session.add(nuevo)
        db.session.commit()
        return {"mensaje": "Usuario registrado correctamente"}

    @staticmethod
    def login(email: str, password: str) -> dict:
        print(f"DEBUG: login() called for email: '{email}'", flush=True)
        usuario = Usuario.query.filter_by(email=email).first()
        if not usuario:
            raise ValueError("Credenciales incorrectas.")

        # Debug log (remover en producción)
        print(f"DEBUG Login attempt: {email}")
        
        # Permitir login con contraseña en texto plano para pruebas O con hash
        match_plain = (usuario.password_hash == password)
        match_hash = check_password_hash(usuario.password_hash, password)
        print(f"DEBUG match_plain: {match_plain}, match_hash: {match_hash}")
        
        is_correct = match_plain or match_hash
        if not is_correct:
            raise ValueError("Credenciales incorrectas.")
        
        token = create_access_token(identity=str(usuario.id_usuario))
        return {
            "token": token,
            "usuario": usuario.to_dict(),
        }