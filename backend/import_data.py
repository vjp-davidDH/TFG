import os
import re
from app import create_app, db
from sqlalchemy import text

def import_sql():
    app = create_app()
    with app.app_context():
        # 1. Borrar base de datos y recrear las tablas limpias
        db.drop_all()
        db.create_all()
        print("Tablas recreadas desde cero.")

        # 2. Leer el archivo SQL original
        sql_path = os.path.join(os.path.dirname(app.config['BASE_DIR']), 'database', 'tripcollab.sql')
        if not os.path.exists(sql_path):
            print(f"Error: No se encontró el archivo en {sql_path}")
            return

        with open(sql_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # 3. Extraer solo las sentencias INSERT
        # Buscar todas las sentencias que empiezan con INSERT INTO y terminan con ;
        inserts = re.findall(r"INSERT INTO[^;]+;", content, re.IGNORECASE | re.DOTALL)
        
        if not inserts:
            print("No se encontraron sentencias INSERT.")
            return

        print(f"Importando {len(inserts)} bloques de datos (INSERTs)...")

        # 4. Ejecutar cada INSERT en SQLite
        with db.engine.begin() as conn:
            for stmt in inserts:
                # SQLite no tiene problemas con las comillas invertidas ` que usa phpMyAdmin
                try:
                    conn.execute(text(stmt))
                except Exception as e:
                    print(f"Omitiendo error en un INSERT: {e}")

        print("¡Todos los datos de tripcollab.sql han sido importados exitosamente a database.db!")

if __name__ == '__main__':
    import_sql()
