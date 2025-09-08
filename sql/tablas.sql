DROP DATABASE IF EXISTS tourtales;
CREATE DATABASE tourtales;

USE tourtales;

CREATE TABLE usuario_turista (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  Nombre varchar(30) NOT NULL,
  Apellido varchar(30) NOT NULL,
  Correo varchar(50) NOT NULL UNIQUE,
  Contrasena varchar(60) NOT NULL,
  Fecha_Nacimiento date NOT NULL,
  Estado_Cuenta char(1) NOT NULL DEFAULT 'N',
  Fecha_Registro date NOT NULL DEFAULT (CURRENT_DATE)
);

CREATE TABLE lugar (
  id_Lugar varchar(27) PRIMARY KEY NOT NULL,
  Nombre varchar(200) NOT NULL
);

CREATE TABLE lugar_favorito (
  id_Lugar_Favorito int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  id_Turista int NOT NULL,    
  id_Lugar varchar(27) not null,
  FOREIGN KEY (id_Turista) REFERENCES usuario_turista(id),
  FOREIGN KEY (id_Lugar) REFERENCES lugar(id_Lugar)
);

CREATE TABLE itinerario (
  id_Itinerario int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  id_Turista int NOT NULL,
  Nombre varchar(50) NOT NULL,
  Duracion time DEFAULT NULL,
  hora_Finalizado time DEFAULT NULL,
  fecha_Creacion date NOT NULL DEFAULT (CURRENT_DATE),
  Estado varchar(1) NOT NULL DEFAULT "N",
  FOREIGN KEY (id_Turista) REFERENCES usuario_turista(id)
);

-- Estados: N (Sin comenzar), C (Comenzado), F (Finalizado)

CREATE TABLE lugar_itinerario (
  id_Lugar_Itinerario int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  id_Lugar varchar(27) NOT NULL,
  id_Itinerario int NOT NULL,
  Posicion int not null DEFAULT 0,
  MetodoTransporte varchar(27) not null,
  Estado varchar(1) NOT NULL DEFAULT "S",
  FOREIGN KEY (id_Lugar) REFERENCES lugar(id_Lugar),
  FOREIGN KEY (id_Itinerario) REFERENCES itinerario(id_Itinerario) ON DELETE CASCADE ON UPDATE CASCADE
);  

-- Estados: S (Sin comenzar), O (Omitido), V (Visitado)

CREATE TABLE lugar_visitado (
  id_Lugar_Visitado int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  id_Turista int NOT NULL,    
  id_Lugar varchar(27) not null,
  FOREIGN KEY (id_Turista) REFERENCES usuario_turista(id) ON DELETE CASCADE,
  FOREIGN KEY (id_Lugar) REFERENCES lugar(id_Lugar)
);

CREATE TABLE queja (
  id_Queja int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  id_Turista int NOT NULL,
  categoria varchar(50) NOT NULL,
  comentario text NOT NULL,
  fecha_envio datetime NOT NULL DEFAULT (CURRENT_DATE),
  FOREIGN KEY (id_turista) REFERENCES usuario_turista(id) ON DELETE CASCADE
);