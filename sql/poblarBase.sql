-- ==================================================================================================================================================
--                                                Insertar múltples usuarios
-- ==================================================================================================================================================

-- ID: 1
insert into usuario_turista (Nombre, Apellido, Correo, Contrasena, Fecha_Nacimiento, Estado_Cuenta) values ("Angel", "Contreras", "ar.contreras372@gmail.com", "$2a$10$kaVtKG0OIS.5J6V2mLvLtuqFmL16hnBNPi727Js8ipFb3Dp/r4L.e", DATE '2003-07-02', "Y");

-- ID: 2
insert into usuario_turista (Nombre, Apellido, Correo, Contrasena, Fecha_Nacimiento, Estado_Cuenta) values ("ARCYNTRAR", "Ramirez", "arcangel557.ac@gmail.com", "$2a$10$kaVtKG0OIS.5J6V2mLvLtuqFmL16hnBNPi727Js8ipFb3Dp/r4L.e", DATE '2003-07-22', "Y");

-- ==================================================================================================================================================
--                                                      Insertar lugares
-- ==================================================================================================================================================

-- IPN
insert into lugar (id_Lugar, Nombre) values ("ChIJ11_XBkz50YURyQoZon1W4T8", "ESCOM - Escuela Superior de Cómputo - IPN");
insert into lugar (id_Lugar, Nombre) values ("ChIJGzL8Pi780YURmTo6y0pF-Ks", "UPIICSA - Unidad Profesional Interdisciplinaria de Ingeniería y Ciencias Sociales y Administrativas IPN");
insert into lugar (id_Lugar, Nombre) values ("ChIJUZoruLn50YURSfk_Wsj3NzM", "ESIT - Escuela Superior de Ingeniería Textil - IPN");
insert into lugar (id_Lugar, Nombre) values ("ChIJvS2xMcj50YURRU2NVWpITa4", "ESIA - Escuela Superior de Ingeniería y Arquitectura Unidad Zacatenco - IPN");
insert into lugar (id_Lugar, Nombre) values ("ChIJPfZhAPoBzoURSAiYfxlTXZc", "ESIME - Escuela Superior de Ingeniería Mecánica y Eléctrica Unidad Culhuacán");
insert into lugar (id_Lugar, Nombre) values ("ChIJ89FJkbj50YURitWvqsiNoaY", "SISCOM Electronica");

-- Restarutantes
insert into lugar (id_Lugar, Nombre) values ("ChIJ6a5BBUb_0YURhTWznkWDX9M", "Green Grass Insurgentes 1446");
insert into lugar (id_Lugar, Nombre) values ("ChIJS8FyNQT_0YURxz1K2sVuNYk", "Green Grass Mitikah");


insert into lugar (id_Lugar, Nombre) values ("ChIJc1loqtD_0YURwsni29Ja9qA", "Vips Coyoacán");
insert into lugar (id_Lugar, Nombre) values ("ChIJteNi1pH_zYURqQiwhRPiAGY", "Vips San Jerónimo");
insert into lugar (id_Lugar, Nombre) values ("ChIJWUnVMNz_0YURw4DElJoawaA", "Carl's Jr.");


insert into lugar (id_Lugar, Nombre) values ("ChIJzzU_4IrfzYUR-2ThY9tuxBg", "Cinépolis Universidad");
insert into lugar (id_Lugar, Nombre) values ("ChIJgYDZxycAzoURoBbRpE_osqM", "Cinépolis"); -- Copilco


insert into lugar (id_Lugar, Nombre) values ("ChIJ3amWCkz-0YURX0rM5y1Vqg4", "Hotel Portales");
insert into lugar (id_Lugar, Nombre) values ("ChIJX2uhd7L_0YURwA8PUwfGjCY", "Hotel Pirámides Narvarte");
insert into lugar (id_Lugar, Nombre) values ("ChIJjTBBvMkBzoUROXNitj33Epo", "Hotel Real Del Sur");

insert into lugar (id_Lugar, Nombre) values ("ChIJVVg3SSv50YURABg7nhqTBz0", "Frikiplaza");
insert into lugar (id_Lugar, Nombre) values ("ChIJGZTVlcn_zYURRZxrmu06Qto", "Six Flags México");
insert into lugar (id_Lugar, Nombre) values ("ChIJcTXc1sf40YURLVbKU3SF7jM", "Palacio de Minería");
insert into lugar (id_Lugar, Nombre) values ("ChIJTQGqdSv50YURz-imDdIQ2Bc", "Palacio de Bellas Artes");
insert into lugar (id_Lugar, Nombre) values ("ChIJbWv_1CD80YUR0my1YUOaodI", "Palacio de los Deportes");

insert into lugar (id_Lugar, Nombre) values ("ChIJuzsl5WwBzoURK_smECm2y6o", "Metro Universidad");
-- insert into lugar (id_Lugar, Nombre) values ("", "")

-- ==================================================================================================================================================
--                                                      Insertar lugar favorito - Usuario 1
-- ==================================================================================================================================================
insert into lugar_favorito (id_Turista, id_Lugar) values ("1", "ChIJ11_XBkz50YURyQoZon1W4T8");
insert into lugar_favorito (id_Turista, id_Lugar) values ("1", "ChIJ6a5BBUb_0YURhTWznkWDX9M");
insert into lugar_favorito (id_Turista, id_Lugar) values ("1", "ChIJ3amWCkz-0YURX0rM5y1Vqg4");
insert into lugar_favorito (id_Turista, id_Lugar) values ("1", "ChIJGZTVlcn_zYURRZxrmu06Qto");
insert into lugar_favorito (id_Turista, id_Lugar) values ("1", "ChIJbWv_1CD80YUR0my1YUOaodI");
insert into lugar_favorito (id_Turista, id_Lugar) values ("1", "ChIJX2uhd7L_0YURwA8PUwfGjCY");

-- ==================================================================================================================================================
--                                                      Insertar itinerario - Usuario 1
-- ==================================================================================================================================================
-- ID: 1
insert into itinerario (id_Turista, Nombre, fecha_Creacion) values ("1", "Hacia ESCOM", "2023-12-21");
-- ID: 2
insert into itinerario (id_Turista, Nombre, fecha_Creacion) values ("1", "Centro", "2023-12-21");
-- ID: 3
insert into itinerario (id_Turista, Nombre, fecha_Creacion) values ("1", "Six Flags", "2023-12-21");
-- ID: 4
insert into itinerario (id_Turista, Nombre, fecha_Creacion) values ("1", "A comer", "2023-12-21");

-- ==================================================================================================================================================
--                                                      Insertar lugar_itinerario - Usuario 1 - Itinerario 1
-- ==================================================================================================================================================

insert into lugar_itinerario (id_Lugar, id_Itinerario, Posicion, MetodoTransporte) values ("ChIJuzsl5WwBzoURK_smECm2y6o", 1, 0, "DRIVING"); -- Metro Universidad
insert into lugar_itinerario (id_Lugar, id_Itinerario, Posicion, MetodoTransporte) values ("ChIJ11_XBkz50YURyQoZon1W4T8", 1, 1, "DRIVING"); -- ESCOM
insert into lugar_itinerario (id_Lugar, id_Itinerario, Posicion, MetodoTransporte) values ("ChIJ89FJkbj50YURitWvqsiNoaY", 1, 2, "DRIVING"); -- SISCOM

insert into lugar_itinerario (id_Lugar, id_Itinerario, Posicion, MetodoTransporte) values ("ChIJ11_XBkz50YURyQoZon1W4T8", 2, 0, "DRIVING"); -- ESCOM
insert into lugar_itinerario (id_Lugar, id_Itinerario, Posicion, MetodoTransporte) values ("ChIJTQGqdSv50YURz-imDdIQ2Bc", 2, 1, "DRIVING"); -- Bellas Artes
insert into lugar_itinerario (id_Lugar, id_Itinerario, Posicion, MetodoTransporte) values ("ChIJcTXc1sf40YURLVbKU3SF7jM", 2, 2, "DRIVING"); -- Mineria
insert into lugar_itinerario (id_Lugar, id_Itinerario, Posicion, MetodoTransporte) values ("ChIJVVg3SSv50YURABg7nhqTBz0", 2, 3, "DRIVING"); -- Frikiplaza

-- insert into lugar_itinerario (id_Lugar, id_Itinerario, Posicion, MetodoTransporte) values ("", 1, 0, "DRIVING")
