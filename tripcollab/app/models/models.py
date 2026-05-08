"""
Modelos SQLAlchemy — TripCollab
Mapeo completo del esquema MySQL proporcionado.
"""
from app import db
from datetime import datetime


# ──────────────────────────────────────────────────────────────────────────────
# USUARIOS
# ──────────────────────────────────────────────────────────────────────────────
class Usuario(db.Model):
    __tablename__ = "usuarios"

    id_usuario      = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre          = db.Column(db.String(100), nullable=False)
    email           = db.Column(db.String(100), nullable=False, unique=True)
    password_hash   = db.Column(db.String(255), nullable=False)
    telefono        = db.Column(db.String(20), nullable=True)
    fecha_registro  = db.Column(db.DateTime, default=datetime.utcnow)

    # Relaciones
    reservas                  = db.relationship("Reserva",                back_populates="usuario",      lazy="dynamic")
    favoritos                 = db.relationship("Favorito",               back_populates="usuario",      lazy="dynamic")
    valoraciones_alojamiento  = db.relationship("ValoracionAlojamiento",  back_populates="usuario",      lazy="dynamic")
    valoraciones_plan         = db.relationship("ValoracionPlan",         back_populates="usuario",      lazy="dynamic")

    def to_dict(self, include_sensitive=False):
        data = {
            "id_usuario":     self.id_usuario,
            "nombre":         self.nombre,
            "email":          self.email,
            "telefono":       self.telefono,
            "fecha_registro": self.fecha_registro.isoformat() if self.fecha_registro else None,
        }
        if include_sensitive:
            data["password_hash"] = self.password_hash
        return data


# ──────────────────────────────────────────────────────────────────────────────
# DESTINOS
# ──────────────────────────────────────────────────────────────────────────────
class Destino(db.Model):
    __tablename__ = "destinos"

    id_destino  = db.Column(db.Integer, primary_key=True, autoincrement=True)
    ciudad      = db.Column(db.String(100), nullable=False)
    pais        = db.Column(db.String(100), nullable=False)
    descripcion = db.Column(db.Text, nullable=True)

    # Relaciones
    alojamientos = db.relationship("Alojamiento", back_populates="destino", lazy="dynamic")
    planes       = db.relationship("Plan",        back_populates="destino", lazy="dynamic")

    def to_dict(self):
        return {
            "id_destino":  self.id_destino,
            "ciudad":      self.ciudad,
            "pais":        self.pais,
            "descripcion": self.descripcion,
        }


# ──────────────────────────────────────────────────────────────────────────────
# ALOJAMIENTOS
# ──────────────────────────────────────────────────────────────────────────────
class Alojamiento(db.Model):
    __tablename__ = "alojamientos"

    id_alojamiento = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre         = db.Column(db.String(150), nullable=False)
    tipo           = db.Column(db.String(50),  nullable=True)
    direccion      = db.Column(db.Text,         nullable=True)
    estrellas      = db.Column(db.Integer,      nullable=True)
    precio_noche   = db.Column(db.Numeric(10, 2), nullable=False)
    id_destino     = db.Column(db.Integer, db.ForeignKey("destinos.id_destino", ondelete="CASCADE"), nullable=False)

    # Relaciones
    destino       = db.relationship("Destino",              back_populates="alojamientos")
    valoraciones  = db.relationship("ValoracionAlojamiento", back_populates="alojamiento", lazy="dynamic")
    planes        = db.relationship("Plan", secondary="plan_alojamiento",  back_populates="alojamientos")

    def to_dict(self):
        return {
            "id_alojamiento": self.id_alojamiento,
            "nombre":         self.nombre,
            "tipo":           self.tipo,
            "direccion":      self.direccion,
            "estrellas":      self.estrellas,
            "precio_noche":   float(self.precio_noche),
            "id_destino":     self.id_destino,
            "destino":        self.destino.to_dict() if self.destino else None,
        }


# ──────────────────────────────────────────────────────────────────────────────
# TRANSPORTES
# ──────────────────────────────────────────────────────────────────────────────
class Transporte(db.Model):
    __tablename__ = "transportes"

    id_transporte  = db.Column(db.Integer, primary_key=True, autoincrement=True)
    tipo           = db.Column(db.String(50), nullable=False)
    origen         = db.Column(db.String(100), nullable=False)
    destino        = db.Column(db.String(100), nullable=False)
    fecha_salida   = db.Column(db.DateTime, nullable=True)
    fecha_llegada  = db.Column(db.DateTime, nullable=True)
    precio         = db.Column(db.Numeric(10, 2), nullable=False)

    # Relaciones
    planes = db.relationship("Plan", secondary="plan_transporte", back_populates="transportes")

    def to_dict(self):
        return {
            "id_transporte": self.id_transporte,
            "tipo":          self.tipo,
            "origen":        self.origen,
            "destino":       self.destino,
            "fecha_salida":  self.fecha_salida.isoformat()  if self.fecha_salida  else None,
            "fecha_llegada": self.fecha_llegada.isoformat() if self.fecha_llegada else None,
            "precio":        float(self.precio),
        }


# ──────────────────────────────────────────────────────────────────────────────
# TABLAS PIVOTE  plan_alojamiento / plan_transporte
# ──────────────────────────────────────────────────────────────────────────────
plan_alojamiento = db.Table(
    "plan_alojamiento",
    db.Column("id_plan",          db.Integer, db.ForeignKey("planes.id_plan",           ondelete="CASCADE"), primary_key=True),
    db.Column("id_alojamiento",   db.Integer, db.ForeignKey("alojamientos.id_alojamiento", ondelete="CASCADE"), primary_key=True),
)

plan_transporte = db.Table(
    "plan_transporte",
    db.Column("id_plan",       db.Integer, db.ForeignKey("planes.id_plan",       ondelete="CASCADE"), primary_key=True),
    db.Column("id_transporte", db.Integer, db.ForeignKey("transportes.id_transporte", ondelete="CASCADE"), primary_key=True),
)


# ──────────────────────────────────────────────────────────────────────────────
# PLANES
# ──────────────────────────────────────────────────────────────────────────────
class Plan(db.Model):
    __tablename__ = "planes"

    id_plan       = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre        = db.Column(db.String(150), nullable=False)
    descripcion   = db.Column(db.Text, nullable=True)
    precio_total  = db.Column(db.Numeric(10, 2), nullable=False)
    id_destino    = db.Column(db.Integer, db.ForeignKey("destinos.id_destino", ondelete="CASCADE"), nullable=False)

    # Relaciones
    destino       = db.relationship("Destino",     back_populates="planes")
    reservas      = db.relationship("Reserva",     back_populates="plan",   lazy="dynamic")
    favoritos     = db.relationship("Favorito",    back_populates="plan",   lazy="dynamic")
    valoraciones  = db.relationship("ValoracionPlan", back_populates="plan", lazy="dynamic")
    alojamientos  = db.relationship("Alojamiento", secondary="plan_alojamiento", back_populates="planes")
    transportes   = db.relationship("Transporte",  secondary="plan_transporte",  back_populates="planes")

    def to_dict(self, include_relations=False):
        data = {
            "id_plan":      self.id_plan,
            "nombre":       self.nombre,
            "descripcion":  self.descripcion,
            "precio_total": float(self.precio_total),
            "id_destino":   self.id_destino,
            "destino":      self.destino.to_dict() if self.destino else None,
        }
        if include_relations:
            data["alojamientos"] = [a.to_dict() for a in self.alojamientos]
            data["transportes"]  = [t.to_dict() for t in self.transportes]
        return data


# ──────────────────────────────────────────────────────────────────────────────
# RESERVAS
# ──────────────────────────────────────────────────────────────────────────────
class Reserva(db.Model):
    __tablename__ = "reservas"

    id_reserva    = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_usuario    = db.Column(db.Integer, db.ForeignKey("usuarios.id_usuario", ondelete="CASCADE"), nullable=False)
    id_plan       = db.Column(db.Integer, db.ForeignKey("planes.id_plan",      ondelete="CASCADE"), nullable=False)
    fecha_reserva = db.Column(db.DateTime, default=datetime.utcnow)
    estado        = db.Column(db.Enum("pendiente", "confirmada", "cancelada"), default="pendiente")
    total_pagado  = db.Column(db.Numeric(10, 2), default=0.00)

    # Relaciones
    usuario = db.relationship("Usuario", back_populates="reservas")
    plan    = db.relationship("Plan",    back_populates="reservas")
    pagos   = db.relationship("Pago",    back_populates="reserva", lazy="dynamic")

    def to_dict(self):
        return {
            "id_reserva":    self.id_reserva,
            "id_usuario":    self.id_usuario,
            "id_plan":       self.id_plan,
            "fecha_reserva": self.fecha_reserva.isoformat() if self.fecha_reserva else None,
            "estado":        self.estado,
            "total_pagado":  float(self.total_pagado),
            "usuario":       self.usuario.to_dict() if self.usuario else None,
            "plan":          self.plan.to_dict()    if self.plan    else None,
        }


# ──────────────────────────────────────────────────────────────────────────────
# PAGOS
# ──────────────────────────────────────────────────────────────────────────────
class Pago(db.Model):
    __tablename__ = "pagos"

    id_pago      = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_reserva   = db.Column(db.Integer, db.ForeignKey("reservas.id_reserva", ondelete="CASCADE"), nullable=False)
    monto        = db.Column(db.Numeric(10, 2), nullable=False)
    metodo_pago  = db.Column(db.Enum("tarjeta", "paypal", "transferencia", "efectivo"), nullable=False)
    estado       = db.Column(db.Enum("pendiente", "pagado", "fallido"), default="pendiente")
    fecha_pago   = db.Column(db.DateTime, default=datetime.utcnow)

    # Relaciones
    reserva = db.relationship("Reserva", back_populates="pagos")

    def to_dict(self):
        return {
            "id_pago":     self.id_pago,
            "id_reserva":  self.id_reserva,
            "monto":       float(self.monto),
            "metodo_pago": self.metodo_pago,
            "estado":      self.estado,
            "fecha_pago":  self.fecha_pago.isoformat() if self.fecha_pago else None,
        }


# ──────────────────────────────────────────────────────────────────────────────
# FAVORITOS
# ──────────────────────────────────────────────────────────────────────────────
class Favorito(db.Model):
    __tablename__ = "favoritos"

    id_usuario = db.Column(db.Integer, db.ForeignKey("usuarios.id_usuario", ondelete="CASCADE"), primary_key=True)
    id_plan    = db.Column(db.Integer, db.ForeignKey("planes.id_plan",      ondelete="CASCADE"), primary_key=True)

    # Relaciones
    usuario = db.relationship("Usuario", back_populates="favoritos")
    plan    = db.relationship("Plan",    back_populates="favoritos")

    def to_dict(self):
        return {
            "id_usuario": self.id_usuario,
            "id_plan":    self.id_plan,
            "plan":       self.plan.to_dict() if self.plan else None,
        }


# ──────────────────────────────────────────────────────────────────────────────
# VALORACIONES DE ALOJAMIENTOS
# ──────────────────────────────────────────────────────────────────────────────
class ValoracionAlojamiento(db.Model):
    __tablename__ = "valoraciones_alojamientos"

    id_valoracion  = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_usuario     = db.Column(db.Integer, db.ForeignKey("usuarios.id_usuario",       ondelete="CASCADE"), nullable=False)
    id_alojamiento = db.Column(db.Integer, db.ForeignKey("alojamientos.id_alojamiento", ondelete="CASCADE"), nullable=False)
    puntuacion     = db.Column(db.Integer, nullable=True)
    comentario     = db.Column(db.Text,    nullable=True)
    fecha          = db.Column(db.DateTime, default=datetime.utcnow)

    __table_args__ = (db.UniqueConstraint("id_usuario", "id_alojamiento"),)

    # Relaciones
    usuario     = db.relationship("Usuario",     back_populates="valoraciones_alojamiento")
    alojamiento = db.relationship("Alojamiento", back_populates="valoraciones")

    def to_dict(self):
        return {
            "id_valoracion":  self.id_valoracion,
            "id_usuario":     self.id_usuario,
            "id_alojamiento": self.id_alojamiento,
            "puntuacion":     self.puntuacion,
            "comentario":     self.comentario,
            "fecha":          self.fecha.isoformat() if self.fecha else None,
        }


# ──────────────────────────────────────────────────────────────────────────────
# VALORACIONES DE PLANES
# ──────────────────────────────────────────────────────────────────────────────
class ValoracionPlan(db.Model):
    __tablename__ = "valoraciones_planes"

    id_valoracion = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_usuario    = db.Column(db.Integer, db.ForeignKey("usuarios.id_usuario", ondelete="CASCADE"), nullable=False)
    id_plan       = db.Column(db.Integer, db.ForeignKey("planes.id_plan",      ondelete="CASCADE"), nullable=False)
    puntuacion    = db.Column(db.Integer, nullable=True)
    comentario    = db.Column(db.Text,    nullable=True)
    fecha         = db.Column(db.DateTime, default=datetime.utcnow)

    __table_args__ = (db.UniqueConstraint("id_usuario", "id_plan"),)

    # Relaciones
    usuario = db.relationship("Usuario", back_populates="valoraciones_plan")
    plan    = db.relationship("Plan",    back_populates="valoraciones")

    def to_dict(self):
        return {
            "id_valoracion": self.id_valoracion,
            "id_usuario":    self.id_usuario,
            "id_plan":       self.id_plan,
            "puntuacion":    self.puntuacion,
            "comentario":    self.comentario,
            "fecha":         self.fecha.isoformat() if self.fecha else None,
        }