from app import create_app, db
from app.services.auth_service import AuthService
from app.models.models import Usuario

app = create_app()
with app.app_context():
    email = "debug@example.com"
    password = "debugpassword"
    
    # Limpiar si existe
    old = Usuario.query.filter_by(email=email).first()
    if old:
        db.session.delete(old)
        db.session.commit()
    
    print(f"Registrando {email}...")
    AuthService.registrar("Debug User", email, password)
    
    print(f"Intentando login para {email}...")
    try:
        result = AuthService.login(email, password)
        print("Login EXITOSO:", result)
    except Exception as e:
        print("Login FALLIDO:", str(e))
