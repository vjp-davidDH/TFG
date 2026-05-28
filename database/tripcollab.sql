-- --------------------------------------------------------
-- Host:                         D:\Usuarios\rmartinb30\Desktop\Proyecto2\TFG\backend\database.db
-- Versión del servidor:         3.51.0
-- SO del servidor:              
-- HeidiSQL Versión:             12.17.0.7270
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES  */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para database
CREATE DATABASE IF NOT EXISTS "database";
;

-- Volcando estructura para tabla database.alojamientos
CREATE TABLE IF NOT EXISTS alojamientos (
  id_alojamiento INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  tipo TEXT,
  direccion TEXT,
  estrellas INTEGER CHECK (estrellas BETWEEN 1 AND 5),
  precio_noche REAL NOT NULL,
  id_destino INTEGER NOT NULL,
  FOREIGN KEY (id_destino) REFERENCES destinos(id_destino) ON DELETE CASCADE
);

-- Volcando datos para la tabla database.alojamientos: 12 rows
INSERT INTO "alojamientos" ("id_alojamiento", "nombre", "tipo", "direccion", "estrellas", "precio_noche", "id_destino") VALUES
	(1, 'Hotel Centro Madrid', 'Hotel', 'Calle Gran Vía 10', 4, 90.0, 1),
	(2, 'Apartamento París', 'Apartamento', 'Rue de Rivoli 25', 5, 140.0, 2),
	(3, 'Riad Marrakesh', 'Hotel', 'Medina Sector 4', 4, 75.0, 3),
	(4, 'Tokyo Capsule', 'Hostal', 'Shinjuku 3-2', 3, 45.0, 4),
	(5, 'London Inn', 'Hotel', 'Victoria St 112', 4, 110.0, 5),
	(6, 'Berlin Loft', 'Apartamento', 'Alexanderplatz 5', 4, 85.0, 6),
	(7, 'Rome Plaza', 'Hotel', 'Via del Corso 22', 5, 160.0, 7),
	(8, 'NY Skyline', 'Hotel', '7th Ave 45', 5, 250.0, 8),
	(9, 'Lisbon Sun', 'Hostal', 'Baixa 14', 3, 35.0, 9),
	(10, 'Prague Old Town', 'Apartamento', 'Celetná 8', 4, 70.0, 10),
	(11, 'Vienna Opera', 'Hotel', 'Kärntner Str 3', 5, 180.0, 11),
	(12, 'Amsterdam Canal', 'Apartamento', 'Prinsengracht 45', 4, 130.0, 12);

-- Volcando estructura para tabla database.destinos
CREATE TABLE IF NOT EXISTS destinos (
  id_destino INTEGER PRIMARY KEY AUTOINCREMENT,
  ciudad TEXT NOT NULL,
  pais TEXT NOT NULL,
  descripcion TEXT
);

-- Volcando datos para la tabla database.destinos: 12 rows
INSERT INTO "destinos" ("id_destino", "ciudad", "pais", "descripcion") VALUES
	(1, 'Madrid', 'España', 'Capital de España con cultura, ocio y gastronomía.'),
	(2, 'París', 'Francia', 'Ciudad turística famosa por la Torre Eiffel.'),
	(3, 'Marrakech', 'Marruecos', 'Ciudad imperial con zocos vibrantes.'),
	(4, 'Tokio', 'Japón', 'Metrópolis futurista con raíces tradicionales.'),
	(5, 'Londres', 'Reino Unido', 'Centro histórico y cultural global.'),
	(6, 'Berlín', 'Alemania', 'Ciudad de historia moderna y arte.'),
	(7, 'Roma', 'Italia', 'La ciudad eterna con monumentos antiguos.'),
	(8, 'Nueva York', 'EE.UU.', 'La gran manzana, nunca duerme.'),
	(9, 'Lisboa', 'Portugal', 'Ciudad de las siete colinas y fado.'),
	(10, 'Praga', 'República Checa', 'La ciudad de las cien torres.'),
	(11, 'Viena', 'Austria', 'Elegancia imperial y música clásica.'),
	(12, 'Ámsterdam', 'Países Bajos', 'Canales históricos y ambiente liberal.');

-- Volcando estructura para tabla database.favoritos
CREATE TABLE IF NOT EXISTS favoritos (
  id_usuario INTEGER NOT NULL,
  id_plan INTEGER NOT NULL,
  PRIMARY KEY (id_usuario, id_plan),
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
  FOREIGN KEY (id_plan) REFERENCES planes(id_plan) ON DELETE CASCADE
);
;

-- Volcando datos para la tabla database.favoritos: 11 rows
INSERT INTO "favoritos" ("id_usuario", "id_plan") VALUES
	(1, 2),
	(3, 4),
	(4, 5),
	(5, 6),
	(6, 7),
	(7, 8),
	(8, 9),
	(9, 10),
	(10, 11),
	(11, 12),
	(12, 1);

-- Volcando estructura para tabla database.pagos
CREATE TABLE IF NOT EXISTS pagos (
  id_pago INTEGER PRIMARY KEY AUTOINCREMENT,
  id_reserva INTEGER NOT NULL,
  monto REAL NOT NULL,
  metodo_pago TEXT NOT NULL CHECK (metodo_pago IN ('tarjeta','paypal','transferencia','efectivo')),
  estado TEXT DEFAULT 'pendiente' CHECK (estado IN ('pendiente','pagado','fallido')),
  fecha_pago TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (id_reserva) REFERENCES reservas(id_reserva) ON DELETE CASCADE
);

-- Volcando datos para la tabla database.pagos: 11 rows
INSERT INTO "pagos" ("id_pago", "id_reserva", "monto", "metodo_pago", "estado", "fecha_pago") VALUES
	(1, 1, 250.0, 'tarjeta', 'pagado', '2026-05-07 14:32:42'),
	(2, 2, 550.0, 'paypal', 'pendiente', '2026-05-07 15:00:00'),
	(3, 3, 300.0, 'tarjeta', 'pagado', '2026-05-07 15:10:00'),
	(4, 4, 1200.0, 'transferencia', 'pagado', '2026-05-07 15:20:00'),
	(5, 5, 450.0, 'tarjeta', 'pagado', '2026-05-07 15:30:00'),
	(6, 6, 400.0, 'paypal', 'fallido', '2026-05-07 15:40:00'),
	(7, 7, 600.0, 'tarjeta', 'pagado', '2026-05-07 15:50:00'),
	(8, 8, 1500.0, 'transferencia', 'pendiente', '2026-05-07 16:00:00'),
	(9, 9, 200.0, 'efectivo', 'pagado', '2026-05-07 16:10:00'),
	(10, 10, 350.0, 'tarjeta', 'pagado', '2026-05-07 16:20:00'),
	(11, 11, 800.0, 'paypal', 'pagado', '2026-05-07 16:30:00');

-- Volcando estructura para tabla database.plan_alojamiento
CREATE TABLE IF NOT EXISTS plan_alojamiento (
  id_plan INTEGER NOT NULL,
  id_alojamiento INTEGER NOT NULL,
  PRIMARY KEY (id_plan, id_alojamiento),
  FOREIGN KEY (id_plan) REFERENCES planes(id_plan) ON DELETE CASCADE,
  FOREIGN KEY (id_alojamiento) REFERENCES alojamientos(id_alojamiento) ON DELETE CASCADE
);
;

-- Volcando datos para la tabla database.plan_alojamiento: 12 rows
INSERT INTO "plan_alojamiento" ("id_plan", "id_alojamiento") VALUES
	(1, 1),
	(2, 2),
	(3, 3),
	(4, 4),
	(5, 5),
	(6, 6),
	(7, 7),
	(8, 8),
	(9, 9),
	(10, 10),
	(11, 11),
	(12, 12);

-- Volcando estructura para tabla database.plan_transporte
CREATE TABLE IF NOT EXISTS plan_transporte (
  id_plan INTEGER NOT NULL,
  id_transporte INTEGER NOT NULL,
  PRIMARY KEY (id_plan, id_transporte),
  FOREIGN KEY (id_plan) REFERENCES planes(id_plan) ON DELETE CASCADE,
  FOREIGN KEY (id_transporte) REFERENCES transportes(id_transporte) ON DELETE CASCADE
);
;

-- Volcando datos para la tabla database.plan_transporte: 12 rows
INSERT INTO "plan_transporte" ("id_plan", "id_transporte") VALUES
	(1, 1),
	(2, 2),
	(3, 3),
	(4, 4),
	(5, 5),
	(6, 6),
	(7, 7),
	(8, 8),
	(9, 9),
	(10, 10),
	(11, 11),
	(12, 12);

-- Volcando estructura para tabla database.planes
CREATE TABLE IF NOT EXISTS planes (
  id_plan INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  precio_total REAL NOT NULL,
  id_destino INTEGER NOT NULL,
  FOREIGN KEY (id_destino) REFERENCES destinos(id_destino) ON DELETE CASCADE
);

-- Volcando datos para la tabla database.planes: 12 rows
INSERT INTO "planes" ("id_plan", "nombre", "descripcion", "precio_total", "id_destino") VALUES
	(1, 'Escapada a Madrid', 'Viaje de fin de semana por Madrid.', 250.0, 1),
	(2, 'Viaje romántico a París', 'Plan de 3 días en París.', 550.0, 2),
	(3, 'Aventura en Marrakech', 'Descubre el desierto y la medina.', 300.0, 3),
	(4, 'Tokio Express', 'Lo mejor de la capital japonesa.', 1200.0, 4),
	(5, 'Londres Cultural', 'Museos y teatro en el West End.', 450.0, 5),
	(6, 'Berlín Histórico', 'Recorrido por la historia del siglo XX.', 400.0, 6),
	(7, 'Roma Clásica', 'Coliseo y Vaticano en 4 días.', 600.0, 7),
	(8, 'NY Experience', 'Vibrante viaje a Manhattan.', 1500.0, 8),
	(9, 'Lisboa Relax', 'Disfruta del fado y la costa.', 200.0, 9),
	(10, 'Praga Mágica', 'Castillos y puentes de cuento.', 350.0, 10),
	(11, 'Viena Musical', 'Ópera y palacios imperiales.', 800.0, 11),
	(12, 'Ámsterdam Canals', 'Bicicletas y canales icónicos.', 400.0, 12);

-- Volcando estructura para tabla database.reservas
CREATE TABLE IF NOT EXISTS reservas (
  id_reserva INTEGER PRIMARY KEY AUTOINCREMENT,
  id_usuario INTEGER NOT NULL,
  id_plan INTEGER NOT NULL,
  fecha_reserva TEXT NOT NULL DEFAULT (datetime('now')),
  estado TEXT DEFAULT 'pendiente' CHECK (estado IN ('pendiente','confirmada','cancelada')),
  total_pagado REAL DEFAULT 0.00,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
  FOREIGN KEY (id_plan) REFERENCES planes(id_plan) ON DELETE CASCADE
);

-- Volcando datos para la tabla database.reservas: 12 rows
INSERT INTO "reservas" ("id_reserva", "id_usuario", "id_plan", "fecha_reserva", "estado", "total_pagado") VALUES
	(1, 1, 1, '2026-05-07 14:32:42', 'confirmada', 250.0),
	(2, 2, 2, '2026-05-07 14:32:42', 'pendiente', 0.0),
	(3, 3, 3, '2026-05-07 15:00:00', 'confirmada', 300.0),
	(4, 4, 4, '2026-05-07 15:10:00', 'confirmada', 1200.0),
	(5, 5, 5, '2026-05-07 15:20:00', 'confirmada', 450.0),
	(6, 6, 6, '2026-05-07 15:30:00', 'pendiente', 0.0),
	(7, 7, 7, '2026-05-07 15:40:00', 'confirmada', 600.0),
	(8, 8, 8, '2026-05-07 15:50:00', 'pendiente', 0.0),
	(9, 9, 9, '2026-05-07 16:00:00', 'confirmada', 200.0),
	(10, 10, 10, '2026-05-07 16:10:00', 'confirmada', 350.0),
	(11, 11, 11, '2026-05-07 16:20:00', 'confirmada', 800.0),
	(12, 12, 12, '2026-05-07 16:30:00', 'confirmada', 400.0);

-- Volcando estructura para tabla database.transportes
CREATE TABLE IF NOT EXISTS transportes (
  id_transporte INTEGER PRIMARY KEY AUTOINCREMENT,
  tipo TEXT NOT NULL,
  origen TEXT NOT NULL,
  destino TEXT NOT NULL,
  fecha_salida TEXT,
  fecha_llegada TEXT,
  precio REAL NOT NULL
);

-- Volcando datos para la tabla database.transportes: 12 rows
INSERT INTO "transportes" ("id_transporte", "tipo", "origen", "destino", "fecha_salida", "fecha_llegada", "precio") VALUES
	(1, 'Tren', 'Barcelona', 'Madrid', '2026-06-10 08:00:00', '2026-06-10 11:00:00', 45.0),
	(2, 'Avión', 'Madrid', 'París', '2026-07-01 09:30:00', '2026-07-01 11:40:00', 120.0),
	(3, 'Avión', 'Madrid', 'Marrakech', '2026-08-05 10:00:00', '2026-08-05 12:30:00', 80.0),
	(4, 'Avión', 'París', 'Tokio', '2026-09-15 22:00:00', '2026-09-16 18:00:00', 700.0),
	(5, 'Tren', 'París', 'Londres', '2026-10-10 09:00:00', '2026-10-10 11:30:00', 110.0),
	(6, 'Tren', 'Londres', 'Berlín', '2026-11-05 10:00:00', '2026-11-05 19:00:00', 95.0),
	(7, 'Tren', 'Berlín', 'Roma', '2026-12-01 08:00:00', '2026-12-01 22:00:00', 140.0),
	(8, 'Avión', 'Roma', 'Nueva York', '2027-01-10 14:00:00', '2027-01-10 18:00:00', 450.0),
	(9, 'Avión', 'Nueva York', 'Lisboa', '2027-02-05 20:00:00', '2027-02-06 08:00:00', 380.0),
	(10, 'Tren', 'Viena', 'Praga', '2027-03-12 10:00:00', '2027-03-12 14:00:00', 25.0),
	(11, 'Tren', 'Praga', 'Viena', '2027-04-15 11:00:00', '2027-04-15 15:00:00', 25.0),
	(12, 'Tren', 'Ámsterdam', 'París', '2027-05-20 09:30:00', '2027-05-20 12:50:00', 55.0);

-- Volcando estructura para tabla database.usuarios
CREATE TABLE IF NOT EXISTS usuarios (
  id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  telefono TEXT,
  fecha_registro TEXT NOT NULL DEFAULT (datetime('now'))
);
;

-- Volcando datos para la tabla database.usuarios: 12 rows
INSERT INTO "usuarios" ("id_usuario", "nombre", "email", "password_hash", "telefono", "fecha_registro") VALUES
	(1, 'Juan Pérez', 'juan@test.com', '1234_hash', '600111222', '2026-05-07 14:32:42'),
	(2, 'Ana López', 'ana@test.com', '1234_hash', '600333444', '2026-05-07 14:32:42'),
	(3, 'Carlos Ruiz', 'carlos@test.com', 'pw_hash_3', '600555666', '2026-05-07 14:40:00'),
	(4, 'Elena Sanz', 'elena@test.com', 'pw_hash_4', '600777888', '2026-05-07 14:45:00'),
	(5, 'Miguel Torres', 'miguel@test.com', 'pw_hash_5', '600999000', '2026-05-07 14:50:00'),
	(6, 'Laura Gómez', 'laura@test.com', 'pw_hash_6', '611222333', '2026-05-07 14:55:00'),
	(7, 'David Marín', 'david@test.com', 'pw_hash_7', '622333444', '2026-05-07 15:00:00'),
	(8, 'Sofía Castro', 'sofia@test.com', 'pw_hash_8', '633444555', '2026-05-07 15:05:00'),
	(9, 'Jorge Vidal', 'jorge@test.com', 'pw_hash_9', '644555666', '2026-05-07 15:10:00'),
	(10, 'Marta Ibáñez', 'marta@test.com', 'pw_hash_10', '655666777', '2026-05-07 15:15:00'),
	(11, 'Pablo Vega', 'pablo@test.com', 'pw_hash_11', '666777888', '2026-05-07 15:20:00'),
	(12, 'Lucía Ramos', 'lucia@test.com', 'pw_hash_12', '677888999', '2026-05-07 15:25:00');

-- Volcando estructura para tabla database.valoraciones_alojamientos
CREATE TABLE IF NOT EXISTS valoraciones_alojamientos (
  id_valoracion INTEGER PRIMARY KEY AUTOINCREMENT,
  id_usuario INTEGER NOT NULL,
  id_alojamiento INTEGER NOT NULL,
  puntuacion INTEGER CHECK (puntuacion BETWEEN 1 AND 5),
  comentario TEXT,
  fecha TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (id_usuario, id_alojamiento),
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
  FOREIGN KEY (id_alojamiento) REFERENCES alojamientos(id_alojamiento) ON DELETE CASCADE
);
;

-- Volcando datos para la tabla database.valoraciones_alojamientos: 10 rows
INSERT INTO "valoraciones_alojamientos" ("id_valoracion", "id_usuario", "id_alojamiento", "puntuacion", "comentario", "fecha") VALUES
	(1, 1, 1, 4, 'Excelente ubicación.', '2026-05-07 15:30:00'),
	(2, 2, 2, 5, 'Vistas increíbles a la Torre Eiffel.', '2026-05-07 15:35:00'),
	(3, 3, 3, 4, 'Riad auténtico y acogedor.', '2026-05-07 15:40:00'),
	(4, 4, 4, 3, 'Experiencia única pero algo claustrofóbico.', '2026-05-07 15:45:00'),
	(5, 5, 5, 4, 'Cerca de la estación, muy práctico.', '2026-05-07 15:50:00'),
	(6, 6, 6, 5, 'Moderno y espacioso.', '2026-05-07 15:55:00'),
	(7, 7, 7, 5, 'Lujo en pleno centro de Roma.', '2026-05-07 16:00:00'),
	(8, 8, 8, 4, 'Las mejores vistas de NY.', '2026-05-07 16:05:00'),
	(9, 9, 9, 3, 'Básico pero limpio y barato.', '2026-05-07 16:10:00'),
	(10, 10, 10, 4, 'Ubicación inmejorable en Praga.', '2026-05-07 16:15:00');

-- Volcando estructura para tabla database.valoraciones_planes
CREATE TABLE IF NOT EXISTS valoraciones_planes (
  id_valoracion INTEGER PRIMARY KEY AUTOINCREMENT,
  id_usuario INTEGER NOT NULL,
  id_plan INTEGER NOT NULL,
  puntuacion INTEGER CHECK (puntuacion BETWEEN 1 AND 5),
  comentario TEXT,
  fecha TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (id_usuario, id_plan),
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
  FOREIGN KEY (id_plan) REFERENCES planes(id_plan) ON DELETE CASCADE
);
;

-- Volcando datos para la tabla database.valoraciones_planes: 11 rows
INSERT INTO "valoraciones_planes" ("id_valoracion", "id_usuario", "id_plan", "puntuacion", "comentario", "fecha") VALUES
	(1, 1, 1, 5, 'Muy buen viaje, todo organizado.', '2026-05-07 14:32:42'),
	(2, 2, 2, 4, 'Un poco caro pero vale la pena.', '2026-05-07 16:20:00'),
	(3, 3, 3, 5, 'Marrakech nunca decepciona.', '2026-05-07 16:25:00'),
	(4, 4, 4, 5, 'Tokio es de otro planeta.', '2026-05-07 16:30:00'),
	(5, 5, 5, 4, 'Mucha cultura y buen clima.', '2026-05-07 16:35:00'),
	(6, 6, 6, 4, 'Berlín es impresionante.', '2026-05-07 16:40:00'),
	(7, 7, 7, 5, 'Comer en Roma es lo mejor.', '2026-05-07 16:45:00'),
	(8, 8, 8, 5, 'NYC es energía pura.', '2026-05-07 16:50:00'),
	(9, 9, 9, 4, 'Lisboa tiene un encanto especial.', '2026-05-07 16:55:00'),
	(10, 10, 10, 5, 'Praga es de cuento de hadas.', '2026-05-07 17:00:00'),
	(11, 11, 11, 4, 'Viena es pura elegancia.', '2026-05-07 17:05:00');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
