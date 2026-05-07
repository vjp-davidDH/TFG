-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-05-2026 a las 16:42:09
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.5.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tripcollab`
--
CREATE DATABASE IF NOT EXISTS `tripcollab` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `tripcollab`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alojamientos`
--

CREATE TABLE `alojamientos` (
  `id_alojamiento` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `direccion` text DEFAULT NULL,
  `estrellas` int(11) DEFAULT NULL CHECK (`estrellas` between 1 and 5),
  `precio_noche` decimal(10,2) NOT NULL,
  `id_destino` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `alojamientos`
--

INSERT INTO `alojamientos` (`id_alojamiento`, `nombre`, `tipo`, `direccion`, `estrellas`, `precio_noche`, `id_destino`) VALUES
(1, 'Hotel Centro Madrid', 'Hotel', 'Calle Gran Vía 10', 4, 90.00, 1),
(2, 'Apartamento París', 'Apartamento', 'Rue de Rivoli 25', 5, 140.00, 2),
(3, 'Riad Marrakesh', 'Hotel', 'Medina Sector 4', 4, 75.00, 3),
(4, 'Tokyo Capsule', 'Hostal', 'Shinjuku 3-2', 3, 45.00, 4),
(5, 'London Inn', 'Hotel', 'Victoria St 112', 4, 110.00, 5),
(6, 'Berlin Loft', 'Apartamento', 'Alexanderplatz 5', 4, 85.00, 6),
(7, 'Rome Plaza', 'Hotel', 'Via del Corso 22', 5, 160.00, 7),
(8, 'NY Skyline', 'Hotel', '7th Ave 45', 5, 250.00, 8),
(9, 'Lisbon Sun', 'Hostal', 'Baixa 14', 3, 35.00, 9),
(10, 'Prague Old Town', 'Apartamento', 'Celetná 8', 4, 70.00, 10),
(11, 'Vienna Opera', 'Hotel', 'Kärntner Str 3', 5, 180.00, 11),
(12, 'Amsterdam Canal', 'Apartamento', 'Prinsengracht 45', 4, 130.00, 12);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `destinos`
--

CREATE TABLE `destinos` (
  `id_destino` int(11) NOT NULL,
  `ciudad` varchar(100) NOT NULL,
  `pais` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `destinos`
--

INSERT INTO `destinos` (`id_destino`, `ciudad`, `pais`, `descripcion`) VALUES
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favoritos`
--

CREATE TABLE `favoritos` (
  `id_usuario` int(11) NOT NULL,
  `id_plan` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `favoritos`
--

INSERT INTO `favoritos` (`id_usuario`, `id_plan`) VALUES
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos`
--

CREATE TABLE `pagos` (
  `id_pago` int(11) NOT NULL,
  `id_reserva` int(11) NOT NULL,
  `monto` decimal(10,2) NOT NULL,
  `metodo_pago` enum('tarjeta','paypal','transferencia','efectivo') NOT NULL,
  `estado` enum('pendiente','pagado','fallido') DEFAULT 'pendiente',
  `fecha_pago` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pagos`
--

INSERT INTO `pagos` (`id_pago`, `id_reserva`, `monto`, `metodo_pago`, `estado`, `fecha_pago`) VALUES
(1, 1, 250.00, 'tarjeta', 'pagado', '2026-05-07 14:32:42'),
(2, 2, 550.00, 'paypal', 'pendiente', '2026-05-07 15:00:00'),
(3, 3, 300.00, 'tarjeta', 'pagado', '2026-05-07 15:10:00'),
(4, 4, 1200.00, 'transferencia', 'pagado', '2026-05-07 15:20:00'),
(5, 5, 450.00, 'tarjeta', 'pagado', '2026-05-07 15:30:00'),
(6, 6, 400.00, 'paypal', 'fallido', '2026-05-07 15:40:00'),
(7, 7, 600.00, 'tarjeta', 'pagado', '2026-05-07 15:50:00'),
(8, 8, 1500.00, 'transferencia', 'pendiente', '2026-05-07 16:00:00'),
(9, 9, 200.00, 'efectivo', 'pagado', '2026-05-07 16:10:00'),
(10, 10, 350.00, 'tarjeta', 'pagado', '2026-05-07 16:20:00'),
(11, 11, 800.00, 'paypal', 'pagado', '2026-05-07 16:30:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `planes`
--

CREATE TABLE `planes` (
  `id_plan` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio_total` decimal(10,2) NOT NULL,
  `id_destino` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `planes`
--

INSERT INTO `planes` (`id_plan`, `nombre`, `descripcion`, `precio_total`, `id_destino`) VALUES
(1, 'Escapada a Madrid', 'Viaje de fin de semana por Madrid.', 250.00, 1),
(2, 'Viaje romántico a París', 'Plan de 3 días en París.', 550.00, 2),
(3, 'Aventura en Marrakech', 'Descubre el desierto y la medina.', 300.00, 3),
(4, 'Tokio Express', 'Lo mejor de la capital japonesa.', 1200.00, 4),
(5, 'Londres Cultural', 'Museos y teatro en el West End.', 450.00, 5),
(6, 'Berlín Histórico', 'Recorrido por la historia del siglo XX.', 400.00, 6),
(7, 'Roma Clásica', 'Coliseo y Vaticano en 4 días.', 600.00, 7),
(8, 'NY Experience', 'Vibrante viaje a Manhattan.', 1500.00, 8),
(9, 'Lisboa Relax', 'Disfruta del fado y la costa.', 200.00, 9),
(10, 'Praga Mágica', 'Castillos y puentes de cuento.', 350.00, 10),
(11, 'Viena Musical', 'Ópera y palacios imperiales.', 800.00, 11),
(12, 'Ámsterdam Canals', 'Bicicletas y canales icónicos.', 400.00, 12);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plan_alojamiento`
--

CREATE TABLE `plan_alojamiento` (
  `id_plan` int(11) NOT NULL,
  `id_alojamiento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `plan_alojamiento`
--

INSERT INTO `plan_alojamiento` (`id_plan`, `id_alojamiento`) VALUES
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plan_transporte`
--

CREATE TABLE `plan_transporte` (
  `id_plan` int(11) NOT NULL,
  `id_transporte` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `plan_transporte`
--

INSERT INTO `plan_transporte` (`id_plan`, `id_transporte`) VALUES
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `id_reserva` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_plan` int(11) NOT NULL,
  `fecha_reserva` timestamp NOT NULL DEFAULT current_timestamp(),
  `estado` enum('pendiente','confirmada','cancelada') DEFAULT 'pendiente',
  `total_pagado` decimal(10,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`id_reserva`, `id_usuario`, `id_plan`, `fecha_reserva`, `estado`, `total_pagado`) VALUES
(1, 1, 1, '2026-05-07 14:32:42', 'confirmada', 250.00),
(2, 2, 2, '2026-05-07 14:32:42', 'pendiente', 0.00),
(3, 3, 3, '2026-05-07 15:00:00', 'confirmada', 300.00),
(4, 4, 4, '2026-05-07 15:10:00', 'confirmada', 1200.00),
(5, 5, 5, '2026-05-07 15:20:00', 'confirmada', 450.00),
(6, 6, 6, '2026-05-07 15:30:00', 'pendiente', 0.00),
(7, 7, 7, '2026-05-07 15:40:00', 'confirmada', 600.00),
(8, 8, 8, '2026-05-07 15:50:00', 'pendiente', 0.00),
(9, 9, 9, '2026-05-07 16:00:00', 'confirmada', 200.00),
(10, 10, 10, '2026-05-07 16:10:00', 'confirmada', 350.00),
(11, 11, 11, '2026-05-07 16:20:00', 'confirmada', 800.00),
(12, 12, 12, '2026-05-07 16:30:00', 'confirmada', 400.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transportes`
--

CREATE TABLE `transportes` (
  `id_transporte` int(11) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `origen` varchar(100) NOT NULL,
  `destino` varchar(100) NOT NULL,
  `fecha_salida` datetime DEFAULT NULL,
  `fecha_llegada` datetime DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `transportes`
--

INSERT INTO `transportes` (`id_transporte`, `tipo`, `origen`, `destino`, `fecha_salida`, `fecha_llegada`, `precio`) VALUES
(1, 'Tren', 'Barcelona', 'Madrid', '2026-06-10 08:00:00', '2026-06-10 11:00:00', 45.00),
(2, 'Avión', 'Madrid', 'París', '2026-07-01 09:30:00', '2026-07-01 11:40:00', 120.00),
(3, 'Avión', 'Madrid', 'Marrakech', '2026-08-05 10:00:00', '2026-08-05 12:30:00', 80.00),
(4, 'Avión', 'París', 'Tokio', '2026-09-15 22:00:00', '2026-09-16 18:00:00', 700.00),
(5, 'Tren', 'París', 'Londres', '2026-10-10 09:00:00', '2026-10-10 11:30:00', 110.00),
(6, 'Tren', 'Londres', 'Berlín', '2026-11-05 10:00:00', '2026-11-05 19:00:00', 95.00),
(7, 'Tren', 'Berlín', 'Roma', '2026-12-01 08:00:00', '2026-12-01 22:00:00', 140.00),
(8, 'Avión', 'Roma', 'Nueva York', '2027-01-10 14:00:00', '2027-01-10 18:00:00', 450.00),
(9, 'Avión', 'Nueva York', 'Lisboa', '2027-02-05 20:00:00', '2027-02-06 08:00:00', 380.00),
(10, 'Tren', 'Viena', 'Praga', '2027-03-12 10:00:00', '2027-03-12 14:00:00', 25.00),
(11, 'Tren', 'Praga', 'Viena', '2027-04-15 11:00:00', '2027-04-15 15:00:00', 25.00),
(12, 'Tren', 'Ámsterdam', 'París', '2027-05-20 09:30:00', '2027-05-20 12:50:00', 55.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `email`, `password_hash`, `telefono`, `fecha_registro`) VALUES
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

-- --------------------------------------------------------

--
CREATE TABLE `valoraciones_alojamientos` (
  `id_valoracion` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_alojamiento` int(11) NOT NULL,
  `puntuacion` int(11) DEFAULT NULL CHECK (`puntuacion` between 1 and 5),
  `comentario` text DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `valoraciones_alojamientos`
--

INSERT INTO `valoraciones_alojamientos` (`id_valoracion`, `id_usuario`, `id_alojamiento`, `puntuacion`, `comentario`, `fecha`) VALUES
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `valoraciones_planes`
--

CREATE TABLE `valoraciones_planes` (
  `id_valoracion` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_plan` int(11) NOT NULL,
  `puntuacion` int(11) DEFAULT NULL CHECK (`puntuacion` between 1 and 5),
  `comentario` text DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `valoraciones_planes`
--

INSERT INTO `valoraciones_planes` (`id_valoracion`, `id_usuario`, `id_plan`, `puntuacion`, `comentario`, `fecha`) VALUES
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

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alojamientos`
--
ALTER TABLE `alojamientos`
  ADD PRIMARY KEY (`id_alojamiento`),
  ADD KEY `id_destino` (`id_destino`);

--
-- Indices de la tabla `destinos`
--
ALTER TABLE `destinos`
  ADD PRIMARY KEY (`id_destino`);

--
-- Indices de la tabla `favoritos`
--
ALTER TABLE `favoritos`
  ADD PRIMARY KEY (`id_usuario`,`id_plan`),
  ADD KEY `id_plan` (`id_plan`);

--
-- Indices de la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD PRIMARY KEY (`id_pago`),
  ADD KEY `id_reserva` (`id_reserva`);

--
-- Indices de la tabla `planes`
--
ALTER TABLE `planes`
  ADD PRIMARY KEY (`id_plan`),
  ADD KEY `id_destino` (`id_destino`);

--
-- Indices de la tabla `plan_alojamiento`
--
ALTER TABLE `plan_alojamiento`
  ADD PRIMARY KEY (`id_plan`,`id_alojamiento`),
  ADD KEY `id_alojamiento` (`id_alojamiento`);

--
-- Indices de la tabla `plan_transporte`
--
ALTER TABLE `plan_transporte`
  ADD PRIMARY KEY (`id_plan`,`id_transporte`),
  ADD KEY `id_transporte` (`id_transporte`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id_reserva`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_plan` (`id_plan`);

--
-- Indices de la tabla `transportes`
--
ALTER TABLE `transportes`
  ADD PRIMARY KEY (`id_transporte`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `valoraciones_alojamientos`
--
ALTER TABLE `valoraciones_alojamientos`
  ADD PRIMARY KEY (`id_valoracion`),
  ADD UNIQUE KEY `id_usuario` (`id_usuario`,`id_alojamiento`),
  ADD KEY `id_alojamiento` (`id_alojamiento`);

--
-- Indices de la tabla `valoraciones_planes`
--
ALTER TABLE `valoraciones_planes`
  ADD PRIMARY KEY (`id_valoracion`),
  ADD UNIQUE KEY `id_usuario` (`id_usuario`,`id_plan`),
  ADD KEY `id_plan` (`id_plan`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alojamientos`
--
ALTER TABLE `alojamientos`
  MODIFY `id_alojamiento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `destinos`
--
ALTER TABLE `destinos`
  MODIFY `id_destino` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `pagos`
--
ALTER TABLE `pagos`
  MODIFY `id_pago` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `planes`
--
ALTER TABLE `planes`
  MODIFY `id_plan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id_reserva` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `transportes`
--
ALTER TABLE `transportes`
  MODIFY `id_transporte` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `valoraciones_alojamientos`
--
ALTER TABLE `valoraciones_alojamientos`
  MODIFY `id_valoracion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `valoraciones_planes`
--
ALTER TABLE `valoraciones_planes`
  MODIFY `id_valoracion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alojamientos`
--
ALTER TABLE `alojamientos`
  ADD CONSTRAINT `alojamientos_ibfk_1` FOREIGN KEY (`id_destino`) REFERENCES `destinos` (`id_destino`) ON DELETE CASCADE;

--
-- Filtros para la tabla `favoritos`
--
ALTER TABLE `favoritos`
  ADD CONSTRAINT `favoritos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `favoritos_ibfk_2` FOREIGN KEY (`id_plan`) REFERENCES `planes` (`id_plan`) ON DELETE CASCADE;

--
-- Filtros para la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD CONSTRAINT `pagos_ibfk_1` FOREIGN KEY (`id_reserva`) REFERENCES `reservas` (`id_reserva`) ON DELETE CASCADE;

--
-- Filtros para la tabla `planes`
--
ALTER TABLE `planes`
  ADD CONSTRAINT `planes_ibfk_1` FOREIGN KEY (`id_destino`) REFERENCES `destinos` (`id_destino`) ON DELETE CASCADE;

--
-- Filtros para la tabla `plan_alojamiento`
--
ALTER TABLE `plan_alojamiento`
  ADD CONSTRAINT `plan_alojamiento_ibfk_1` FOREIGN KEY (`id_plan`) REFERENCES `planes` (`id_plan`) ON DELETE CASCADE,
  ADD CONSTRAINT `plan_alojamiento_ibfk_2` FOREIGN KEY (`id_alojamiento`) REFERENCES `alojamientos` (`id_alojamiento`) ON DELETE CASCADE;

--
-- Filtros para la tabla `plan_transporte`
--
ALTER TABLE `plan_transporte`
  ADD CONSTRAINT `plan_transporte_ibfk_1` FOREIGN KEY (`id_plan`) REFERENCES `planes` (`id_plan`) ON DELETE CASCADE,
  ADD CONSTRAINT `plan_transporte_ibfk_2` FOREIGN KEY (`id_transporte`) REFERENCES `transportes` (`id_transporte`) ON DELETE CASCADE;

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `reservas_ibfk_2` FOREIGN KEY (`id_plan`) REFERENCES `planes` (`id_plan`) ON DELETE CASCADE;

--
-- Filtros para la tabla `valoraciones_alojamientos`
--
ALTER TABLE `valoraciones_alojamientos`
  ADD CONSTRAINT `valoraciones_alojamientos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `valoraciones_alojamientos_ibfk_2` FOREIGN KEY (`id_alojamiento`) REFERENCES `alojamientos` (`id_alojamiento`) ON DELETE CASCADE;

--
-- Filtros para la tabla `valoraciones_planes`
--
ALTER TABLE `valoraciones_planes`
  ADD CONSTRAINT `valoraciones_planes_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `valoraciones_planes_ibfk_2` FOREIGN KEY (`id_plan`) REFERENCES `planes` (`id_plan`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;