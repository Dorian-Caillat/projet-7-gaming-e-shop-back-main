const { getSingleResult, getManyResult } = require('./utils');

/*
  Dans toutes les requêtes pour la table "user":

  Le préfix "public." est obligatoire car une table user
  existe déjà dans PostgreSQL. Le préfix "public" va signifier à pg
  qu'il faut chercher les informations dans la table "user" présente
  dans le registre "public", c'est à dire dans notre table "user"
  et pas dans la table "user" de psql
*/

const userDataMapper = {

  // Requête SQL pour obtenir toutes les informations utilisable à propos
  // des utilisateurs
  async getAll() {
    const sqlQuery = `SELECT
                        public.user.civility, 
                        public.user.firstname,
                        public.user.lastname,
                        public.user.birthday,
                        public.user.address,
                        public.user.phone,
                        public.user.mail
                      FROM public.user
                      ORDER BY public.user.id ASC`;

    return await getManyResult(sqlQuery);
  },

  // Requête SQL pour obtenir toutes les informations utilisable à propos
  // d'un seul utilisateur
  // L'utilisateur est récupérer via le "user".mail
  async getOne(userMail) {
    const sqlQuery = `SELECT
                        public.user.civility, 
                        public.user.firstname,
                        public.user.lastname,
                        public.user.birthday,
                        public.user.address,
                        public.user.phone,
                        public.user.mail
                      FROM public.user
                      WHERE public.user.mail = $1`;
    const values = [userMail];

    return await getSingleResult(sqlQuery, values);
  },

  // Requête SQL pour ajouter un utilisateur à la base de donnée
  // Utilise la fonction SQL "insert_user" (ref. "/script/SQL/create_function.sql")
  // Utilise un objet JSON comme value à input
  async create(userData) {
    const sqlQuery = 'SELECT * FROM public.insert_user($1)';
    const values = [userData];

    return await getSingleResult(sqlQuery, values);
  },

  // Requête SQL pour supprimer un utilisateur de la base de donnée
  // Utilise la fonction SQL "delete_user" (ref. "/script/SQL/create_function.sql")
  // Utilise le user.mail comme value
  async delete(userMail) {
    const sqlQuery = 'SELECT * FROM public.delete_user($1)';
    const values = [userMail];

    return await getSingleResult(sqlQuery, values);
  },

  // Requête SQL pour modifier un utilisateur de la base de donnée
  // Utilise la fonction SQL "update_user" (ref. "/script/SQL/create_function.sql")
  // Utilise un objet JSON avec toute les informations d'un utilisateur comme value
  // (même celle qui ne sont pas modifier)
  async update(userData) {
    const sqlQuery = 'SELECT * FROM public.update_user($1)';
    const values = [userData];

    return await getSingleResult(sqlQuery, values);
  },

  // Requête SQL pour obtenir toute les informations d'un utilisateur MEME SON MOT DE PASSE
  // Cette fonction n'est utilisable que par l'API et ne sert que pour le login
  async findWithPassword(userMail) {
    const sqlQuery = 'SELECT * FROM public.user WHERE mail = $1';
    const values = [userMail];

    return await getSingleResult(sqlQuery, values);
  },

};

module.exports = userDataMapper;
