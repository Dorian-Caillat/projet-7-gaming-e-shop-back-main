const pool = require('../service/dbPool');

const utilDB = {

  /**
   * Retourne la premiere ligne retournees par la requetes
   *
   * @param {*} sqlQuery
   * @param {*} values
   * @returns
   */
  async getSingleResult(sqlQuery, values) {
    let result;
    let error;

    try {
      const response = await pool.query(sqlQuery, values);

      result = response.rows[0];
    } catch (err) {
      error = err;
    }

    return { error, result };
  },

  /**
   * Retourne toutes les lignes retournees par la requetes
   *
   * @param {*} sqlQuery
   * @param {*} values
   * @returns
   */
  async getManyResult(sqlQuery, values) {
    let result;
    let error;

    try {
      const response = await pool.query(sqlQuery, values);

      result = response.rows;
    } catch (err) {
      error = err;
    }

    return { error, result };
  },

};

module.exports = utilDB;
