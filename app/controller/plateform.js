/* eslint-disable linebreak-style */
const { plateformDataMapper } = require('../datamapper');

const plateformController = {

  // Fonction qui va requêter toutes les plateformes enregistrer dans la base de donnée
  // Renvoi un tableau d'objet JSON avec les plateformes
  async getAllPlateform(_, response, next) {
    const { error, result } = await plateformDataMapper.getAll();

    if (error) {
      next(error);
    } else {
      response.json(result);
    }
  },

  // Fonction qui va requêter une plateform enregistré dans la base de donnée
  // Renvoi un tableau d'objet JSON avec la console selection (via le slug)
  async getOnePlateform(request, response, next) {
    const { error, result } = await plateformDataMapper.getOne(request.params.slug);

    if (error) {
      next(error);
    } else {
      response.json(result);
    }
  },
};

module.exports = plateformController;
