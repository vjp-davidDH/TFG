# ✈️ TripCollab - TFG

Bienvenido al repositorio de **TripCollab**. Esta aplicación está dividida en dos partes principales: el **Backend** (Python/Flask) y el **Frontend** (React/Vite).

La base de datos (SQLite) se generará automáticamente de forma local al iniciar el servidor, por lo que **no es necesario** utilizar XAMPP ni servidores MySQL externos para desarrollo.

---

## ⚙️ Requisitos Previos
Asegúrate de tener instalados en tu sistema:
- [Python 3.x](https://www.python.org/downloads/)
- [Node.js y npm](https://nodejs.org/es/)

---

## 🐍 1. Configurar e Iniciar el Backend

Abre una terminal (PowerShell recomendado) y ejecuta los siguientes comandos para preparar el entorno de Python y arrancar el servidor:

```powershell
# 1. Moverse a la carpeta del backend
cd backend/
venv\Scripts\Activate.ps1
pip install -r requirements.txt
// CON EL XAMPP ENCENDIDO
python run.py
```
> **Nota:** El servidor backend debería estar corriendo ahora en `http://127.0.0.1:5000`

---

## ⚛️ 2. Configurar e Iniciar el Frontend

Abre **otra nueva terminal** (para no cerrar la del backend) y ejecuta los siguientes pasos:

```powershell
# 1. Moverse a la carpeta del frontend
cd frontend/
npm run install
npm run dev
```


