from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app.services.services import AlojamientoService

alojamiento_bp = Blueprint("alojamientos", __name__)


@alojamiento_bp.route("/", methods=["GET"])
def list_alojamientos():
    return jsonify([a.to_dict() for a in AlojamientoService.list_all()]), 200


@alojamiento_bp.route("/<int:aid>", methods=["GET"])
def get_alojamiento(aid):
    try:
        return jsonify(AlojamientoService.get_by_id(aid).to_dict()), 200
    except LookupError as e:
        return jsonify({"error": str(e)}), 404


@alojamiento_bp.route("/", methods=["POST"])
@jwt_required()
def create_alojamiento():
    data = request.get_json() or {}
    a = AlojamientoService.create(data)
    return jsonify(a.to_dict()), 201


@alojamiento_bp.route("/<int:aid>", methods=["PUT"])
@jwt_required()
def update_alojamiento(aid):
    try:
        a = AlojamientoService.update(aid, request.get_json() or {})
        return jsonify(a.to_dict()), 200
    except LookupError as e:
        return jsonify({"error": str(e)}), 404


@alojamiento_bp.route("/<int:aid>", methods=["DELETE"])
@jwt_required()
def delete_alojamiento(aid):
    try:
        AlojamientoService.delete(aid)
        return jsonify({"mensaje": "Alojamiento eliminado."}), 200
    except LookupError as e:
        return jsonify({"error": str(e)}), 404