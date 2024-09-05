const Joi = require('joi');

const userSchemas = {

  savePurchase: Joi.object({

    user_id: Joi.number().integer().positive().required(),
    total: Joi.number().positive().required(),
    game_slug: Joi.array().items(Joi.string().min(1).required()).required(),

  }),
};

module.exports = userSchemas;
