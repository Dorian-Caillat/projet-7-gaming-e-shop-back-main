const debug = require('debug')('G-eShop:validation');

const validation = {

  /**
   * generate a validation function
   * @param {Object} schema
   * @param {"query"|"params"|"body"} source
   * @returns a validation function for the provided schema and data source
   */
  validatorFactory(schema, source) {
    return async (request, _, next) => {
      try {
        await schema.validateAsync(request[source]);
        next();
      } catch (err) {
        debug(request[source]);
        debug(err);
      }
    };
  },

};

module.exports = validation.validatorFactory;
