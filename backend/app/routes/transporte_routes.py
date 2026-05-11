from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app.services.services import TransporteService

transporte_bp = Blueprint("transportes", __name__)


@transporte_bp.route("/", methods=["GET"])
def list_transportes():
    return jsonify([t.to_dict() for t in TransporteService.list_all()]), 200


@transporte_bp.route("/<int:tid>", methods=["GET"])
def get_transporte(tid):
    try:
        return jsonify(TransporteService.get_by_id(tid).to_dict()), 200
    except LookupError as e:
        return jsonify({"error": str(e)}), 404


@transporte_bp.route("/", methods=["POST"])
@jwt_required()
def create_transporte():
    data = request.get_json() or {}
    t = TransporteService.create(data)
    return jsonify(t.to_dict()), 201


@transporte_bp.route("/<int:tid>", methods=["PUT"])
@jwt_required()
def update_transporte(tid):
    try:
        t = TransporteService.update(tid, request.get_json() or {})
        return jsonify(t.to_dict()), 200
    except LookupError as e:
        return jsonify({"error": str(e)}), 404


@transporte_bp.route("/<int:tid>", methods=["DELETE"])
@jwt_required()
def delete_transporte(tid):
    try:
        TransporteService.delete(tid)
        return jsonify({"mensaje": "Transporte eliminado."}), 200
    except LookupError as e:
        return jsonify({"error": str(e)}), 404