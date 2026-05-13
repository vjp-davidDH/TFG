from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.services.services import ValoracionService

valoracion_bp = Blueprint("valoraciones", __name__)

# ── Alojamientos ──────────────────────────────────────────────────────────────

@valoracion_bp.route("/alojamientos/<int:aid>", methods=["GET"])
def list_val_alojamiento(aid):
    vals = ValoracionService.list_alojamiento(aid)
    return jsonify([v.to_dict() for v in vals]), 200


@valoracion_bp.route("/alojamientos", methods=["POST"])
@jwt_required()
def create_val_alojamiento():
    uid = int(get_jwt_identity())
    data = request.get_json() or {}
    try:
        v = ValoracionService.create_alojamiento(uid, data)
        return jsonify(v.to_dict()), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@valoracion_bp.route("/alojamientos/<int:vid>", methods=["DELETE"])
@jwt_required()
def delete_val_alojamiento(vid):
    uid = int(get_jwt_identity())
    try:
        ValoracionService.delete_alojamiento(vid, uid)
        return jsonify({"mensaje": "Valoración eliminada."}), 200
    except LookupError as e:
        return jsonify({"error": str(e)}), 404

# ── Planes ────────────────────────────────────────────────────────────────────

@valoracion_bp.route("/planes/<int:pid>", methods=["GET"])
def list_val_plan(pid):
    vals = ValoracionService.list_plan(pid)
    return jsonify([v.to_dict() for v in vals]), 200


@valoracion_bp.route("/planes", methods=["POST"])
@jwt_required()
def create_val_plan():
    uid = int(get_jwt_identity())
    data = request.get_json() or {}
    try:
        v = ValoracionService.create_plan(uid, data)
        return jsonify(v.to_dict()), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@valoracion_bp.route("/planes/<int:vid>", methods=["DELETE"])
@jwt_required()
def delete_val_plan(vid):
    uid = int(get_jwt_identity())
    try:
        ValoracionService.delete_plan(vid, uid)
        return jsonify({"mensaje": "Valoración eliminada."}), 200
    except LookupError as e:
        return jsonify({"error": str(e)}), 404