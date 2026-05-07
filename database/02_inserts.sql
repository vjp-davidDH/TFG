INSERT INTO usuarios (nombre, email, password_hash, telefono) VALUES
('Juan Pérez', 'juan@test.com', '1234_hash', '600111222'),
('Ana López', 'ana@test.com', '1234_hash', '600333444');

INSERT INTO destinos (ciudad, pais, descripcion) VALUES
('Madrid', 'España', 'Capital de España con cultura, ocio y gastronomía.'),
('París', 'Francia', 'Ciudad turística famosa por la Torre Eiffel.');

INSERT INTO alojamientos (nombre, tipo, direccion, estrellas, precio_noche, id_destino) VALUES
('Hotel Centro Madrid', 'Hotel', 'Calle Gran Vía 10', 4, 90.00, 1),
('Apartamento París', 'Apartamento', 'Rue de Rivoli 25', 5, 140.00, 2);

INSERT INTO transportes (tipo, origen, destino, fecha_salida, fecha_llegada, precio) VALUES
('Tren', 'Barcelona', 'Madrid', '2026-06-10 08:00:00', '2026-06-10 11:00:00', 45.00),
('Avión', 'Madrid', 'París', '2026-07-01 09:30:00', '2026-07-01 11:40:00', 120.00);

INSERT INTO planes (nombre, descripcion, precio_total, id_destino) VALUES
('Escapada a Madrid', 'Viaje de fin de semana por Madrid.', 250.00, 1),
('Viaje romántico a París', 'Plan de 3 días en París.', 550.00, 2);

INSERT INTO plan_alojamiento VALUES
(1, 1),
(2, 2);

INSERT INTO plan_transporte VALUES
(1, 1),
(2, 2);

INSERT INTO reservas (id_usuario, id_plan, estado, total_pagado) VALUES
(1, 1, 'confirmada', 250.00),
(2, 2, 'pendiente', 0.00);

INSERT INTO pagos (id_reserva, monto, metodo_pago, estado) VALUES
(1, 250.00, 'tarjeta', 'pagado');

INSERT INTO valoraciones_planes (id_usuario, id_plan, puntuacion, comentario) VALUES
(1, 1, 5, 'Muy buen viaje, todo organizado.');

INSERT INTO favoritos VALUES
(1, 2);