from app import create_app, db
from app.models.models import Destino, Plan, Usuario
from datetime import datetime
from werkzeug.security import generate_password_hash

def seed_data():
    app = create_app()
    with app.app_context():
        # Limpiar datos existentes (opcional, cuidado en producción)
        # db.drop_all()
        db.create_all()

        if Destino.query.first():
            print("La base de datos ya tiene datos. Saltando seeding.")
            return

        print("Iniciando seeding...")

        # 1. Crear Destinos
        d1 = Destino(ciudad="París", pais="Francia", descripcion="La ciudad del amor y la luz.")
        d2 = Destino(ciudad="Cusco", pais="Perú", descripcion="Puerta de entrada a Machu Picchu.")
        d3 = Destino(ciudad="Tokyo", pais="Japón", descripcion="Metrópolis vibrante con templos antiguos.")
        d4 = Destino(ciudad="Nueva York", pais="USA", descripcion="La gran manzana.")

        db.session.add_all([d1, d2, d3, d4])
        db.session.commit()

        # 2. Crear un Usuario de prueba
        password = "password123"
        hashed = generate_password_hash(password)
        user = Usuario(nombre="Usuario Prueba", email="test@example.com", password_hash=hashed)
        db.session.add(user)
        db.session.commit()

        # 3. Crear Planes
        p1 = Plan(nombre="EuroTrip 2026", descripcion="Un viaje por las mejores ciudades de Europa.", precio_total=1500.00, id_destino=d1.id_destino)
        p2 = Plan(nombre="Aventura en los Andes", descripcion="Trekking y cultura en el corazón de Perú.", precio_total=800.00, id_destino=d2.id_destino)
        p3 = Plan(nombre="Tokyo Neon Nights", descripcion="Descubre la noche y la tecnología de Japón.", precio_total=1200.00, id_destino=d3.id_destino)

        db.session.add_all([p1, p2, p3])
        db.session.commit()

        print("Seeding completado con éxito.")

if __name__ == "__main__":
    seed_data()
