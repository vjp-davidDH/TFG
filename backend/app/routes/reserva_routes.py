from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.services.services import ReservaService

reserva_bp = Blueprint("reservas", __name__)


@reserva_bp.route("/", methods=["GET"])
@jwt_required()
def list_reservas():
    uid = int(get_jwt_identity())
    reservas = ReservaService.list_by_user(uid)
    return jsonify([r.to_dict() for r in reservas]), 200


@reserva_bp.route("/<int:rid>", methods=["GET"])
@jwt_required()
def get_reserva(rid):
    try:
        r = ReservaService.get_by_id(rid)
        uid = int(get_jwt_identity())
        if r.id_usuario != uid:
            return jsonify({"error": "Sin permisos."}), 403
        return jsonify(r.to_dict()), 200
    except LookupError as e:
        return jsonify({"error": str(e)}), 404


@reserva_bp.route("/", methods=["POST"])
@jwt_required()
def create_reserva():
    uid = int(get_jwt_identity())
    data = request.get_json() or {}
    if "id_plan" not in data:
        return jsonify({"error": "id_plan requerido."}), 400
    r = ReservaService.create(uid, data)
    return jsonify(r.to_dict()), 201


@reserva_bp.route("/<int:rid>/estado", methods=["PATCH"])
@jwt_required()
def update_estado(rid):
    data = request.get_json() or {}
    estado = data.get("estado")
    if estado not in ("pendiente", "confirmada", "cancelada"):
        return jsonify({"error": "Estado inválido."}), 400
    try:
        r = ReservaService.update_estado(rid, estado)
        return jsonify(r.to_dict()), 200
    except LookupError as e:
        return jsonify({"error": str(e)}), 404


@reserva_bp.route("/<int:rid>", methods=["DELETE"])
@jwt_required()
def delete_reserva(rid):
    try:
        uid = int(get_jwt_identity())
        r = ReservaService.get_by_id(rid)
        if r.id_usuario != uid:
            return jsonify({"error": "Sin permisos."}), 403
        ReservaService.delete(rid)
        return jsonify({"mensaje": "Reserva eliminada."}), 200
    except LookupError as e:
        return jsonify({"error": str(e)}), 404