from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app.services.services import PagoService

pago_bp = Blueprint("pagos", __name__)


@pago_bp.route("/reserva/<int:rid>", methods=["GET"])
@jwt_required()
def list_pagos(rid):
    pagos = PagoService.list_by_reserva(rid)
    return jsonify([p.to_dict() for p in pagos]), 200


@pago_bp.route("/<int:pid>", methods=["GET"])
@jwt_required()
def get_pago(pid):
    try:
        return jsonify(PagoService.get_by_id(pid).to_dict()), 200
    except LookupError as e:
        return jsonify({"error": str(e)}), 404


@pago_bp.route("/", methods=["POST"])
@jwt_required()
def create_pago():
    data = request.get_json() or {}
    required = ("id_reserva", "monto", "metodo_pago")
    missing = [f for f in required if f not in data]
    if missing:
        return jsonify({"error": f"Campos requeridos: {missing}"}), 400
    p = PagoService.create(data)
    return jsonify(p.to_dict()), 201