const { getSingleResult, getManyResult } = require('./utils');

const gameDataMapper = {

  // Requête SQL pour obtenir toutes les informations utilisable à propos jeux
  async getAll() {
    const sqlQuery = `SELECT 
                        game.slug,
                        game.name as "name",
                        game.description as "description",
                        TO_CHAR(game.release, 'DD/MM/YYYY') as "release_date",
                        game.price as "price",
                        game.offer as "special_offer",
                        game.physical as "physical_version",
                        game.quantity as "quantity",
                        game.image_url,
                        (
                          SELECT
                            ARRAY_AGG(plateform.name)
                          FROM public.plateform
                          WHERE plateform.id IN (
                            SELECT 
                              game_has_plateform.plateform_id
                            FROM public.game_has_plateform
                            WHERE game_id = game.id
                          )
                        ) as "plateforms"
                      FROM public.game
                      ORDER BY game.id ASC`;

    return await getManyResult(sqlQuery);
  },

  // Requête SQL pour obtenir toutes les informations utilisable à propos des jeux d'une
  // seule plateforme (via le slug de la plateforme)
  async getAllForPlateform(plateformSlug) {
    const sqlQuery = `SELECT 
                        game.slug,
                        game.name as "name",
                        game.description as "description",
                        TO_CHAR(game.release, 'DD/MM/YYYY') as "release_date",
                        game.price as "price",
                        game.offer as "special_offer",
                        game.physical as "physical_version",
                        game.quantity as "quantity",
                        game.image_url
                      FROM public.game
                      WHERE public.game.id IN (
                        SELECT
                          public.game_has_plateform.game_id
                        FROM public.game_has_plateform
                        WHERE public.game_has_plateform.plateform_id = (
                          SELECT
                            public.plateform.id
                          FROM public.plateform
                          WHERE public.plateform.slug = $1
                        )
                      )
                      ORDER BY game.id ASC;`;
    const values = [plateformSlug];

    return await getManyResult(sqlQuery, values);
  },

  // Requête SQL pour obtenir toutes les informations utilisable à propos d'un seul jeu
  // Le jeu est récupérer via le game.slug
  async getOne(gameSlug) {
    const sqlQuery = `SELECT 
                        game.slug,
                        game.name as "name",
                        game.description as "description",
                        TO_CHAR(game.release, 'DD/MM/YYYY') as "release_date",
                        game.price as "price",
                        game.offer as "special_offer",
                        game.physical as "physical_version",
                        game.quantity as "quantity",
                        game.image_url,
                        (
                          SELECT
                            ARRAY_AGG(plateform.name)
                          FROM public.plateform
                          WHERE plateform.id IN (
                            SELECT 
                              game_has_plateform.plateform_id
                            FROM public.game_has_plateform
                            WHERE game_id = game.id
                          )
                        ) as "plateforms"
                      FROM public.game
                      WHERE public.game.slug = $1`;
    const values = [gameSlug];

    return await getSingleResult(sqlQuery, values);
  },

  // Requête SQL pour ajouter un jeu à la base de donnée
  // Utilise la fonction SQL "insert_game" (ref. "/script/SQL/create_function.sql")
  // Utilise un objet JSON comme value à input
  async create(gameData) {
    const sqlQuery = 'SELECT * FROM public.insert_game($1)';
    const values = [gameData];

    return await getSingleResult(sqlQuery, values);
  },

  // Requête SQL pour supprimer un jeu de la base de donnée
  // Utilise la fonction SQL "delete_game" (ref. "/script/SQL/create_function.sql")
  // Utilise le game.slug comme value
  async delete(gameSlug) {
    const sqlQuery = 'SELECT * FROM public.delete_game($1)';
    const values = [gameSlug];

    return await getSingleResult(sqlQuery, values);
  },

  // Requête SQL pour modifier un jeu de la base de donnée
  // Utilise la fonction SQL "update_game" (ref. "/script/SQL/create_function.sql")
  // Utilise le game.slug comme value
  async update(gameData) {
    const sqlQuery = 'SELECT * FROM public.update_game($1)';
    const values = [gameData];

    return await getSingleResult(sqlQuery, values);
  },

};

module.exports = gameDataMapper;
