<<<<<<< HEAD
# TripCollab - Base de Datos

## Tecnologías
- MySQL
- Python
- React

## Cómo importar la base de datos

### 1. Abrir XAMPP
Iniciar:
- Apache
- MySQL

### 2. Entrar en phpMyAdmin
Abrir:
http://localhost/phpmyadmin

### 3. Ejecutar los archivos SQL

Primero ejecutar:
01_schema.sql

Después ejecutar:
02_inserts.sql

## Cómo exportar la BD

En phpMyAdmin:
- Seleccionar la base de datos
- Pulsar Exportar
- Formato SQL

## Cómo probar conexión con Python

Instalar:

pip install mysql-connector-python

Ejemplo:

```python
import mysql.connector

conexion = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="tripcollab"
)

print("Conectado")
=======
(Powershell)
cd backend/
python -m venv venv
.\venv\Scripts\Activate
pip install -r requirements.txt
// CON EL XAMPP ENCENDIDO
python run.py

cd frontend/
npm install
npm run dev
>>>>>>> origin/raul
