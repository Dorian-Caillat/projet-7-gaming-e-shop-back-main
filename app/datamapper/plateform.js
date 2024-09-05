const { getSingleResult, getManyResult } = require('./utils');

const plateformDataMapper = {

  // Requête SQL pour obtenir toutes les informations utilisable à propos plateformes
  async getAll() {
    const sqlQuery = `SELECT 
                        plateform.slug,
                        plateform.name
                      FROM public.plateform`;

    return await getManyResult(sqlQuery);
  },

  // Requête SQL pour obtenir toutes les informations utilisable à
  // propos d'une seule plateforme
  // La plateforme est récupérer via le plateform.slug
  async getOne(plateformSlug) {
    const sqlQuery = `SELECT 
                        plateform.slug,
                        plateform.name
                      FROM public.plateform
                      WHERE plateform.slug = $1`;
    const values = [plateformSlug];

    return await getSingleResult(sqlQuery, values);
  },

};

module.exports = plateformDataMapper;
