BEGIN;

-- Table pour les plateforme (consoles)
CREATE TABLE IF NOT EXISTS public.plateform
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    slug text NOT NULL UNIQUE,
    name text NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

-- Table pour les jeux
CREATE TABLE IF NOT EXISTS public.game
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    slug text NOT NULL UNIQUE,
    name text NOT NULL UNIQUE,
    description text,
    editeur_id integer,
    release date NOT NULL DEFAULT now(),
    price float NOT NULL,
    offer integer DEFAULT 0,
    physical boolean NOT NULL DEFAULT false,
    quantity integer NOT NULL DEFAULT 999999,
    image_url text,
    CONSTRAINT game_pkey PRIMARY KEY (id)
);

--Table pour user 
CREATE TABLE IF NOT EXISTS public.user
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    civility text NOT NULL, 
    firstname text NOT NULL,
    lastname text NOT NULL,
    birthday date,
    address text NOT NULL,
    phone text,
    mail text NOT NULL UNIQUE,
    password text NOT NULL,
    PRIMARY KEY (id)
);

-- Table pour les achats
CREATE TABLE IF NOT EXISTS public.purchase
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    user_id integer NOT NULL,
    purchase_date date NOT NULL DEFAULT now(),
    total double precision NOT NULL DEFAULT 0,
    game_slug json NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT user_fkey FOREIGN KEY (user_id)
        REFERENCES public."user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID
);

------------ Tables d'associations ------------
-- Table pour joindre les jeux au plateformes
CREATE TABLE IF NOT EXISTS public.game_has_plateform
(
    game_id integer,
    plateform_id integer,
    CONSTRAINT game_has_plateform_game_fkey FOREIGN KEY (game_id)
        REFERENCES public.game (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID,
    CONSTRAINT game_has_plateform_plateform_fkey FOREIGN KEY (plateform_id)
        REFERENCES public.plateform (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID
);

END;
