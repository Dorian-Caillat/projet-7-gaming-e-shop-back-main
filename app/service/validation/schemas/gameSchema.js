const Joi = require('joi');

const slugRule = Joi.string().min(2).pattern(/^[a-z0-9_]+$/);
const stringRule = Joi.string().min(2).pattern(/^[a-zA-ZÀ-ÿ0-9 '-]+$/);

const gameSchemas = {

  publishGame: Joi.object({

    slug: slugRule.required(),
    name: stringRule.required(),
    description: stringRule.required(),
    price: Joi.number().required(),
    special_offer: Joi.number().integer().required(),
    physical_version: Joi.boolean().required(),
    quantity: Joi.number().integer().required(),

  }),

};

module.exports = gameSchemas;
