BEGIN;

INSERT INTO public.plateform("slug", "name") 
VALUES ('ps4', 'PS4'),
	   ('ps5', 'PS5'),
	   ('xbox', 'XBox Series X/S'),
	   ('switch', 'Switch'),
	   ('3ds', '3DS'),
	   ('computer', 'PC/MAC');

INSERT INTO public.game("slug", "name", "description", "price", "offer", "physical", "quantity")
VALUES  ('jeux1', 'Jeux 1', 'description', 69.99, 20, false, 999999),
		('jeux2', 'Jeux 2', 'description', 69.99, 20, true, 12),
		('jeux3', 'Jeux 3', 'description', 69.99, 20, false, 999999),
		('jeux4', 'Jeux 4', 'description', 69.99, 20, true, 64587),
		('jeux5', 'Jeux 5', 'description', 69.99, 20, false, 999999),
		('jeux6', 'Jeux 6', 'description', 69.99, 20, true, 8),
		('jeux7', 'Jeux 7', 'description', 69.99, 20, false, 999999),
		('jeux8', 'Jeux 8', 'description', 69.99, 20, true, 10),
		('jeux9', 'Jeux 9', 'description', 69.99, 20, false, 999999),
		('jeux10', 'Jeux 10', 'description', 69.99, 20, true, 642),
	   

INSERT INTO public.game_has_plateform("game_id", "plateform_id")
VALUES (1, 1), 
	   (2, 2), 
       (2, 3), 
       (3, 4), 
	   (3, 5), 
       (3, 6), 
       (4, 1),
	   (4, 2),
	   (4, 3),
	   (4, 4),
	   (5, 1),
	   (5, 2),
	   (5, 3),
	   (5, 4),
	   (5, 5),
	   (6, 1),
	   (6, 2),
	   (6, 3),
	   (6, 4),
	   (6, 5),
	   (6, 6),
	   (7, 1),
	   (8, 1),
	   (9, 1),
	   (10, 1);

INSERT INTO public.user("civility","firstname", "lastname", "birthday", "address", "phone", "mail", "password")
VALUES ('Homme', 'José', 'Montiu', '1996-12-07', '1, Rue Marto, 41000, Faixant', '+33 6 04 02 01 05', 'test.account@mail.com', '$2b$10$MQ.zzVirnXLxgh4QF1ukEO.BBKuzhFRjmkODe5rGKAauEHBiVbvQ6');

COMMIT;