const { getSingleResult, getManyResult } = require('./utils');

const purchaseDataMapper = {

  // Requête SQL pour obtenir tout les achats enregistrer
  async getAll() {
    const sqlQuery = `SELECT 
                        purchase.user_id as "user",
                        purchase.purchase_date as "date",
                        purchase.total,
                        purchase.game_slug as "games"
                      FROM public.purchase
                      ORDER BY purchase.id ASC`;

    return await getManyResult(sqlQuery);
  },

  // Requête SQL pour obtenir tout les achats d'un seul utilisateur
  // via le mail de l'utilisateur
  async getAllForUser(userMail) {
    const sqlQuery = `SELECT 
                        purchase.user_id as "user",
                        purchase.purchase_date as "date",
                        purchase.total,
                        purchase.game_slug as "games"
                      FROM public.purchase
                      WHERE purchase.user_id = (
                        SELECT public."user".id
                        FROM public."user"
                        WHERE public."user".mail = $1
                      )`;
    const values = [userMail];

    return await getManyResult(sqlQuery, values);
  },

  // Requête SQL pour ajouter un achat à la base de donnée
  // Utilise la fonction SQL "insert_purchase" (ref. "/script/SQL/create_function.sql")
  // Utilise un objet JSON comme value à input
  async create(purchaseData) {
    const sqlQuery = 'SELECT * FROM public.insert_purchase($1)';
    const values = [purchaseData];

    return await getSingleResult(sqlQuery, values);
  },

};

module.exports = purchaseDataMapper;
