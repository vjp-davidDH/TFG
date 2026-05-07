CREATE DATABASE IF NOT EXISTS tripcollab;
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE plan_alojamiento (
    id_plan INT NOT NULL,
    id_alojamiento INT NOT NULL,
    PRIMARY KEY (id_plan, id_alojamiento),
    FOREIGN KEY (id_plan) REFERENCES planes(id_plan)
        ON DELETE CASCADE,
    FOREIGN KEY (id_alojamiento) REFERENCES alojamientos(id_alojamiento)
        ON DELETE CASCADE
);

CREATE TABLE plan_transporte (
    id_plan INT NOT NULL,
    id_transporte INT NOT NULL,
    PRIMARY KEY (id_plan, id_transporte),
    FOREIGN KEY (id_plan) REFERENCES planes(id_plan)
        ON DELETE CASCADE,
    FOREIGN KEY (id_transporte) REFERENCES transportes(id_transporte)
        ON DELETE CASCADE
);

CREATE TABLE reservas (
    id_reserva INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_plan INT NOT NULL,
    fecha_reserva TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('pendiente', 'confirmada', 'cancelada') DEFAULT 'pendiente',
    total_pagado DECIMAL(10,2) DEFAULT 0,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
        ON DELETE CASCADE,
    FOREIGN KEY (id_plan) REFERENCES planes(id_plan)
        ON DELETE CASCADE
);

CREATE TABLE pagos (
    id_pago INT AUTO_INCREMENT PRIMARY KEY,
    id_reserva INT NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    metodo_pago ENUM('tarjeta', 'paypal', 'transferencia', 'efectivo') NOT NULL,
    estado ENUM('pendiente', 'pagado', 'fallido') DEFAULT 'pendiente',
    fecha_pago TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_reserva) REFERENCES reservas(id_reserva)
        ON DELETE CASCADE
);

CREATE TABLE valoraciones_alojamientos (
    id_valoracion INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_alojamiento INT NOT NULL,
    puntuacion INT CHECK (puntuacion BETWEEN 1 AND 5),
    comentario TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
        ON DELETE CASCADE,
    FOREIGN KEY (id_alojamiento) REFERENCES alojamientos(id_alojamiento)
        ON DELETE CASCADE,
    UNIQUE (id_usuario, id_alojamiento)
);

CREATE TABLE valoraciones_planes (
    id_valoracion INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_plan INT NOT NULL,
    puntuacion INT CHECK (puntuacion BETWEEN 1 AND 5),
    comentario TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
        ON DELETE CASCADE,
    FOREIGN KEY (id_plan) REFERENCES planes(id_plan)
        ON DELETE CASCADE,
    UNIQUE (id_usuario, id_plan)
);

CREATE TABLE favoritos (
    id_usuario INT NOT NULL,
    id_plan INT NOT NULL,
    PRIMARY KEY (id_usuario, id_plan),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
        ON DELETE CASCADE,
    FOREIGN KEY (id_plan) REFERENCES planes(id_plan)
        ON DELETE CASCADE
);