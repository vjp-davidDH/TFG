"""
Servicios genéricos de negocio reutilizables.
"""
from app import db
from app.models.models import (
    Usuario, Destino, Alojamiento, Transporte,
    Plan, Reserva, Pago, Favorito,
    ValoracionAlojamiento, ValoracionPlan,
)
from werkzeug.security import generate_password_hash


# ── Usuarios ──────────────────────────────────────────────────────────────────
class UsuarioService:
    @staticmethod
    def get_by_id(uid: int) -> Usuario:
        u = Usuario.query.get(uid)
        if not u:
            raise LookupError("Usuario no encontrado.")
        return u

    @staticmethod
    def update(uid: int, data: dict) -> Usuario:
        u = UsuarioService.get_by_id(uid)
        for field in ("nombre", "telefono"):
            if field in data:
                setattr(u, field, data[field])
        if "password" in data:
            u.password_hash = generate_password_hash(data["password"])
        db.session.commit()
        return u

    @staticmethod
    def delete(uid: int):
        u = UsuarioService.get_by_id(uid)
        db.session.delete(u)
        db.session.commit()


# ── Destinos ──────────────────────────────────────────────────────────────────
class DestinoService:
    @staticmethod
    def list_all():
        return Destino.query.all()

    @staticmethod
    def get_by_id(did: int) -> Destino:
        d = Destino.query.get(did)
        if not d:
            raise LookupError("Destino no encontrado.")
        return d

    @staticmethod
    def create(data: dict) -> Destino:
        d = Destino(**data)
        db.session.add(d)
        db.session.commit()
        return d

    @staticmethod
    def update(did: int, data: dict) -> Destino:
        d = DestinoService.get_by_id(did)
        for k, v in data.items():
            setattr(d, k, v)
        db.session.commit()
        return d

    @staticmethod
    def delete(did: int):
        d = DestinoService.get_by_id(did)
        db.session.delete(d)
        db.session.commit()


# ── Planes ────────────────────────────────────────────────────────────────────
class PlanService:
    @staticmethod
    def list_all():
        return Plan.query.all()

    @staticmethod
    def get_by_id(pid: int) -> Plan:
        p = Plan.query.get(pid)
        if not p:
            raise LookupError("Plan no encontrado.")
        return p

    @staticmethod
    def create(data: dict) -> Plan:
        p = Plan(
            nombre=data["nombre"],
            descripcion=data.get("descripcion"),
            precio_total=data["precio_total"],
            id_destino=data["id_destino"],
        )
        db.session.add(p)
        db.session.commit()
        return p

    @staticmethod
    def update(pid: int, data: dict) -> Plan:
        p = PlanService.get_by_id(pid)
        for k, v in data.items():
            setattr(p, k, v)
        db.session.commit()
        return p

    @staticmethod
    def delete(pid: int):
        p = PlanService.get_by_id(pid)
        db.session.delete(p)
        db.session.commit()


# ── Reservas ──────────────────────────────────────────────────────────────────
class ReservaService:
    @staticmethod
    def list_by_user(uid: int):
        return Reserva.query.filter_by(id_usuario=uid).all()

    @staticmethod
    def get_by_id(rid: int) -> Reserva:
        r = Reserva.query.get(rid)
        if not r:
            raise LookupError("Reserva no encontrada.")
        return r

    @staticmethod
    def create(uid: int, data: dict) -> Reserva:
        r = Reserva(
            id_usuario=uid,
            id_plan=data["id_plan"],
            estado=data.get("estado", "pendiente"),
        )
        db.session.add(r)
        db.session.commit()
        return r

    @staticmethod
    def update_estado(rid: int, estado: str) -> Reserva:
        r = ReservaService.get_by_id(rid)
        r.estado = estado
        db.session.commit()
        return r

    @staticmethod
    def delete(rid: int):
        r = ReservaService.get_by_id(rid)
        db.session.delete(r)
        db.session.commit()


# ── Pagos ─────────────────────────────────────────────────────────────────────
class PagoService:
    @staticmethod
    def list_by_reserva(rid: int):
        return Pago.query.filter_by(id_reserva=rid).all()

    @staticmethod
    def get_by_id(pid: int) -> Pago:
        p = Pago.query.get(pid)
        if not p:
            raise LookupError("Pago no encontrado.")
        return p

    @staticmethod
    def create(data: dict) -> Pago:
        p = Pago(
            id_reserva=data["id_reserva"],
            monto=data["monto"],
            metodo_pago=data["metodo_pago"],
            estado=data.get("estado", "pendiente"),
        )
        db.session.add(p)
        # Actualizar total_pagado en reserva si el pago es exitoso
        if p.estado == "pagado":
            reserva = Reserva.query.get(data["id_reserva"])
            if reserva:
                reserva.total_pagado = (reserva.total_pagado or 0) + float(data["monto"])
        db.session.commit()
        return p


# ── Alojamientos ──────────────────────────────────────────────────────────────
class AlojamientoService:
    @staticmethod
    def list_all():
        return Alojamiento.query.all()

    @staticmethod
    def get_by_id(aid: int) -> Alojamiento:
        a = Alojamiento.query.get(aid)
        if not a:
            raise LookupError("Alojamiento no encontrado.")
        return a

    @staticmethod
    def create(data: dict) -> Alojamiento:
        a = Alojamiento(**data)
        db.session.add(a)
        db.session.commit()
        return a

    @staticmethod
    def update(aid: int, data: dict) -> Alojamiento:
        a = AlojamientoService.get_by_id(aid)
        for k, v in data.items():
            setattr(a, k, v)
        db.session.commit()
        return a

    @staticmethod
    def delete(aid: int):
        a = AlojamientoService.get_by_id(aid)
        db.session.delete(a)
        db.session.commit()


# ── Transportes ───────────────────────────────────────────────────────────────
class TransporteService:
    @staticmethod
    def list_all():
        return Transporte.query.all()

    @staticmethod
    def get_by_id(tid: int) -> Transporte:
        t = Transporte.query.get(tid)
        if not t:
            raise LookupError("Transporte no encontrado.")
        return t

    @staticmethod
    def create(data: dict) -> Transporte:
        t = Transporte(**data)
        db.session.add(t)
        db.session.commit()
        return t

    @staticmethod
    def update(tid: int, data: dict) -> Transporte:
        t = TransporteService.get_by_id(tid)
        for k, v in data.items():
            setattr(t, k, v)
        db.session.commit()
        return t

    @staticmethod
    def delete(tid: int):
        t = TransporteService.get_by_id(tid)
        db.session.delete(t)
        db.session.commit()


# ── Favoritos ─────────────────────────────────────────────────────────────────
class FavoritoService:
    @staticmethod
    def list_by_user(uid: int):
        return Favorito.query.filter_by(id_usuario=uid).all()

    @staticmethod
    def add(uid: int, id_plan: int) -> Favorito:
        if Favorito.query.get((uid, id_plan)):
            raise ValueError("Ya está en favoritos.")
        f = Favorito(id_usuario=uid, id_plan=id_plan)
        db.session.add(f)
        db.session.commit()
        return f

    @staticmethod
    def remove(uid: int, id_plan: int):
        f = Favorito.query.get((uid, id_plan))
        if not f:
            raise LookupError("Favorito no encontrado.")
        db.session.delete(f)
        db.session.commit()


# ── Valoraciones ──────────────────────────────────────────────────────────────
class ValoracionService:
    # --- Alojamientos ---
    @staticmethod
    def list_alojamiento(aid: int):
        return ValoracionAlojamiento.query.filter_by(id_alojamiento=aid).all()

    @staticmethod
    def create_alojamiento(uid: int, data: dict) -> ValoracionAlojamiento:
        v = ValoracionAlojamiento(id_usuario=uid, **data)
        db.session.add(v)
        db.session.commit()
        return v

    @staticmethod
    def delete_alojamiento(vid: int, uid: int):
        v = ValoracionAlojamiento.query.get(vid)
        if not v or v.id_usuario != uid:
            raise LookupError("Valoración no encontrada o sin permisos.")
        db.session.delete(v)
        db.session.commit()

    # --- Planes ---
    @staticmethod
    def list_plan(pid: int):
        return ValoracionPlan.query.filter_by(id_plan=pid).all()

    @staticmethod
    def create_plan(uid: int, data: dict) -> ValoracionPlan:
        v = ValoracionPlan(id_usuario=uid, **data)
        db.session.add(v)
        db.session.commit()
        return v

    @staticmethod
    def delete_plan(vid: int, uid: int):
        v = ValoracionPlan.query.get(vid)
        if not v or v.id_usuario != uid:
            raise LookupError("Valoración no encontrada o sin permisos.")
        db.session.delete(v)
        db.session.commit()