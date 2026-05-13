from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.services.services import FavoritoService

favorito_bp = Blueprint("favoritos", __name__)


@favorito_bp.route("/", methods=["GET"])
@jwt_required()
def list_favoritos():
    uid = int(get_jwt_identity())
    favs = FavoritoService.list_by_user(uid)
    return jsonify([f.to_dict() for f in favs]), 200


@favorito_bp.route("/", methods=["POST"])
@jwt_required()
def add_favorito():
    uid = int(get_jwt_identity())
    data = request.get_json() or {}
    if "id_plan" not in data:
        return jsonify({"error": "id_plan requerido."}), 400
    try:
        f = FavoritoService.add(uid, data["id_plan"])
        return jsonify(f.to_dict()), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 409


@favorito_bp.route("/<int:id_plan>", methods=["DELETE"])
@jwt_required()
def remove_favorito(id_plan):
    uid = int(get_jwt_identity())
    try:
        FavoritoService.remove(uid, id_plan)
        return jsonify({"mensaje": "Favorito eliminado."}), 200
    except LookupError as e:
        return jsonify({"error": str(e)}), 404