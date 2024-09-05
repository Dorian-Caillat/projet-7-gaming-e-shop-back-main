BEGIN;

-- Fonction pour insert un jeu
CREATE OR REPLACE FUNCTION insert_game(json) RETURNS "game" AS $$
    INSERT INTO public."game"
    (slug, name, description, price, offer, physical, quantity)
    VALUES (
        $1->>'slug',
        $1->>'name',
        $1->>'description',
        ($1->>'price')::FLOAT,
        ($1->>'special_offer')::INTEGER,
        ($1->>'physical_version')::BOOLEAN,
        ($1->>'quantity')::INTEGER
    ) RETURNING *;

$$ LANGUAGE SQL SECURITY DEFINER;

-- Fonction pour delete un jeu
CREATE OR REPLACE FUNCTION delete_game(text) RETURNS void AS $$

	DELETE FROM public.game
	WHERE slug=$1;

$$ LANGUAGE SQL SECURITY DEFINER;

-- Fonction pour modifier un jeu
CREATE OR REPLACE FUNCTION update_game(json) RETURNS "game" AS $$

	UPDATE public.game
	SET
		name=COALESCE($1->>'name', name),
		description=COALESCE($1->>'description', description),
		price=COALESCE(($1->>'price')::FLOAT, price),
		offer=COALESCE(($1->>'special_offer')::INTEGER, offer),
		physical=COALESCE(($1->>'physical_version')::BOOLEAN, physical),
		quantity=COALESCE(($1->>'quantity')::INTEGER, quantity)
	WHERE game.slug=$1->>'slug'
	RETURNING *;

$$ LANGUAGE SQL SECURITY DEFINER;

-- Fonction pour insert un user
CREATE OR REPLACE FUNCTION insert_user(json) RETURNS "user" AS $$
    INSERT INTO public."user"
    (civility, firstname, lastname, birthday, address, phone, mail, password)
    VALUES (
		$1->>'civility',
        $1->>'firstname',
        $1->>'lastname',
        ($1->>'birthday')::DATE,
        $1->>'address',
        $1->>'phone',
        $1->>'mail',
        $1->>'password'
    ) RETURNING *;

$$ LANGUAGE SQL SECURITY DEFINER;

-- Fonction pour delete un user
CREATE OR REPLACE FUNCTION delete_user(text) RETURNS void AS $$

	DELETE FROM public.user
	WHERE mail=$1;

$$ LANGUAGE SQL SECURITY DEFINER;

-- Fonction pour modifier un user
CREATE OR REPLACE FUNCTION update_user(json) RETURNS "user" AS $$

	UPDATE public.user
	SET
		civility=COALESCE($1->>'civility', civility),
		firstname=COALESCE($1->>'firstname', firstname),
		lastname=COALESCE($1->>'lastname', lastname),
		birthday=COALESCE(($1->>'birthday')::DATE, birthday),
		address=COALESCE($1->>'address', address),
		phone=COALESCE($1->>'phone', phone)
	WHERE public."user".mail = $1->>'mail'
	RETURNING *;

$$ LANGUAGE SQL SECURITY DEFINER;

-- Fonction pour insert un achat
CREATE OR REPLACE FUNCTION insert_purchase(json) RETURNS "purchase" AS $$
    INSERT INTO public.purchase
    (user_id, total, game_slug)
    VALUES (
		($1->>'user_id')::integer,
        ($1->>'total')::float,
        ($1->>'game_slug')::json
    ) RETURNING *;

$$ LANGUAGE SQL SECURITY DEFINER;

END;
