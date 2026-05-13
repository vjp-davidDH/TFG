"""destino_routes.py"""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app.services.services import DestinoService

destino_bp = Blueprint("destinos", __name__)

@destino_bp.route("/", methods=["GET"])
def list_destinos():
    return jsonify([d.to_dict() for d in DestinoService.list_all()]), 200

@destino_bp.route("/<int:did>", methods=["GET"])
def get_destino(did):
    try:
        return jsonify(DestinoService.get_by_id(did).to_dict()), 200
    except LookupError as e:
        return jsonify({"error": str(e)}), 404

@destino_bp.route("/", methods=["POST"])
@jwt_required()
def create_destino():
    data = request.get_json() or {}
    d = DestinoService.create(data)
    return jsonify(d.to_dict()), 201

@destino_bp.route("/<int:did>", methods=["PUT"])
@jwt_required()
def update_destino(did):
    try:
        d = DestinoService.update(did, request.get_json() or {})
        return jsonify(d.to_dict()), 200
    except LookupError as e:
        return jsonify({"error": str(e)}), 404

@destino_bp.route("/<int:did>", methods=["DELETE"])
@jwt_required()
def delete_destino(did):
    try:
        DestinoService.delete(did)
        return jsonify({"mensaje": "Destino eliminado."}), 200
    except LookupError as e:
        return jsonify({"error": str(e)}), 404