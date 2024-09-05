const Joi = require('joi');

const nameRule = Joi.string().min(2).pattern(/^['a-zA'-ZÀ-ÿ0-9 '-]+$/);
const passRule = Joi.string().min(2).pattern(/^['a-zA'-ZÀ-ÿ0-9 '-@#$%&()]+$/);

const userSchemas = {

  sendUserData: Joi.object({

    civility: Joi.string().pattern(/^(Femme|Homme|Autre)$/).required(),
    firstname: nameRule.required(),
    lastname: nameRule.required(),
    birthday: Joi.date().required(),
    address: Joi.string().required(),
    phone: Joi.number().integer().positive().required(),
    mail: Joi.string().required(),
    password: passRule.required(),

  }),

  editUserData: Joi.object({

    civility: Joi.string().pattern(/^(Femme|Homme|Autre)$/).required(),
    firstname: nameRule.required(),
    lastname: nameRule.required(),
    birthday: Joi.date().required(),
    address: Joi.string().required(),
    phone: Joi.number().integer().positive().required(),
    mail: Joi.string().required(),

  }),

  loginUserData: Joi.object({
    mail: Joi.string().required(),
    password: Joi.string().required(),

  }),

};

module.exports = userSchemas;
