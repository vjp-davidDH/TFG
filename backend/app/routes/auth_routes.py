from flask import Blueprint, request, jsonify
from app.services.auth_service import AuthService

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json() or {}
    required = ("nombre", "email", "password")
    missing = [f for f in required if f not in data]
    if missing:
        return jsonify({"error": f"Campos requeridos: {missing}"}), 400
    try:
        result = AuthService.registrar(data["nombre"], data["email"], data["password"])
        return jsonify(result), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 409


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    if not data.get("email") or not data.get("password"):
        return jsonify({"error": "Email y contraseña requeridos."}), 400
    try:
        result = AuthService.login(data["email"], data["password"])
        return jsonify(result), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 401