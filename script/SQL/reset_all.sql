BEGIN;

-- Suppression des fonctions en premier pour évité tout les conflits
DROP FUNCTION IF EXISTS public.delete_game, public.update_game, public.insert_game;
DROP FUNCTION IF EXISTS public.delete_user, public.update_user, public.insert_user;
DROP FUNCTION IF EXISTS public.insert_purchase;

-- Suppression des tables d'assossiation en suite pour évité les conflits
-- avec les tables normales
DROP TABLE IF EXISTS public.game_has_plateform;

-- Suppression des tables normales
-- L'ordre importe car purchase dépend de user
DROP TABLE IF EXISTS public.purchase, public.user, public.game, public.plateform;

END;