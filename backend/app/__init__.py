from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config.settings import Config

db = SQLAlchemy()
jwt = JWTManager()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.url_map.strict_slashes = False
    app.config.from_object(config_class)

    db.init_app(app)
    jwt.init_app(app)
    
    # CORS: permitir credenciales y origen específico del frontend
    CORS(app, resources={r"/api/*": {"origins": ["http://localhost:5173"]}}, supports_credentials=True)

    # Permitir preflight OPTIONS para todas las rutas /api/*
    @app.before_request
    def handle_options():
        if request.method == 'OPTIONS':
            return '', 200

    @app.before_request
    def log_request_info():
        app.logger.info('Headers: %s', request.headers)
        app.logger.info('Body: %s', request.get_data())

    @app.errorhandler(Exception)
    def handle_exception(e):
        app.logger.error(f"Unhandled Exception: {str(e)}")
        return {"error": "Internal Server Error", "message": str(e)}, 500

    @app.route("/")
    def home():
        return {"message": "API TripCollab funcionando"}
    # Registrar blueprints
    from app.routes.auth_routes import auth_bp
    from app.routes.user_routes import user_bp
    from app.routes.plan_routes import plan_bp
    from app.routes.destino_routes import destino_bp
    from app.routes.reserva_routes import reserva_bp
    from app.routes.pago_routes import pago_bp
    from app.routes.alojamiento_routes import alojamiento_bp
    from app.routes.transporte_routes import transporte_bp
    from app.routes.favorito_routes import favorito_bp
    from app.routes.valoracion_routes import valoracion_bp

    app.register_blueprint(auth_bp,         url_prefix="/api/auth")
    app.register_blueprint(user_bp,         url_prefix="/api/usuarios")
    app.register_blueprint(plan_bp,         url_prefix="/api/planes")
    app.register_blueprint(destino_bp,      url_prefix="/api/destinos")
    app.register_blueprint(reserva_bp,      url_prefix="/api/reservas")
    app.register_blueprint(pago_bp,         url_prefix="/api/pagos")
    app.register_blueprint(alojamiento_bp,  url_prefix="/api/alojamientos")
    app.register_blueprint(transporte_bp,   url_prefix="/api/transportes")
    app.register_blueprint(favorito_bp,     url_prefix="/api/favoritos")
    app.register_blueprint(valoracion_bp,   url_prefix="/api/valoraciones")

    with app.app_context():
        db.create_all()

    return app