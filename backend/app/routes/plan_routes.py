from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app.services.services import PlanService

plan_bp = Blueprint("planes", __name__)


@plan_bp.route("/", methods=["GET"])
def list_planes():
    planes = PlanService.list_all()
    return jsonify([p.to_dict(include_relations=True) for p in planes]), 200


@plan_bp.route("/<int:pid>", methods=["GET"])
def get_plan(pid):
    try:
        p = PlanService.get_by_id(pid)
        return jsonify(p.to_dict(include_relations=True)), 200
    except LookupError as e:
        return jsonify({"error": str(e)}), 404


@plan_bp.route("/", methods=["POST"])
@jwt_required()
def create_plan():
    data = request.get_json() or {}
    required = ("nombre", "precio_total", "id_destino")
    missing = [f for f in required if f not in data]
    if missing:
        return jsonify({"error": f"Campos requeridos: {missing}"}), 400
    p = PlanService.create(data)
    return jsonify(p.to_dict()), 201


@plan_bp.route("/<int:pid>", methods=["PUT"])
@jwt_required()
def update_plan(pid):
    data = request.get_json() or {}
    try:
        p = PlanService.update(pid, data)
        return jsonify(p.to_dict()), 200
    except LookupError as e:
        return jsonify({"error": str(e)}), 404


@plan_bp.route("/<int:pid>", methods=["DELETE"])
@jwt_required()
def delete_plan(pid):
    try:
        PlanService.delete(pid)
        return jsonify({"mensaje": "Plan eliminado."}), 200
    except LookupError as e:
        return jsonify({"error": str(e)}), 404