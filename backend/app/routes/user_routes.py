from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.services.services import UsuarioService

user_bp = Blueprint("usuarios", __name__)


@user_bp.route("/me", methods=["GET"])
@jwt_required()
def me():
    uid = int(get_jwt_identity())
    try:
        u = UsuarioService.get_by_id(uid)
        return jsonify(u.to_dict()), 200
    except LookupError as e:
        return jsonify({"error": str(e)}), 404


@user_bp.route("/me", methods=["PUT"])
@jwt_required()
def update_me():
    uid = int(get_jwt_identity())
    data = request.get_json() or {}
    try:
        u = UsuarioService.update(uid, data)
        return jsonify(u.to_dict()), 200
    except LookupError as e:
        return jsonify({"error": str(e)}), 404
    except ValueError as e:
        return jsonify({"error": str(e)}), 409


@user_bp.route("/me", methods=["DELETE"])
@jwt_required()
def delete_me():
    uid = int(get_jwt_identity())
    try:
        UsuarioService.delete(uid)
        return jsonify({"mensaje": "Cuenta eliminada."}), 200
    except LookupError as e:
        return jsonify({"error": str(e)}), 404