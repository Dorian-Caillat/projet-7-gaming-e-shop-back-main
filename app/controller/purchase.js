const { purchaseDataMapper } = require('../datamapper');

const purchaseController = {

  // Fonction qui va requêter tout les achats enregistrer dans la base de donnée
  // Renvoi un tableau d'objet JSON avec les informations des achats
  async getAll(_, response, next) {
    const { error, result } = await purchaseDataMapper.getAll();

    if (error) {
      next(error);
    } else {
      response.json(result);
    }
  },

  // Fonction qui va requêter tout les achats enregistrer dans la base de donnée
  // pour un utilisateur donnée. L'utilisateur est trier par son mail
  // Renvoi un tableau d'objet JSON avec les informations des achats
  async getAllForUser(request, response, next) {
    const userMail = request.params.user_mail;

    const { error, result } = await purchaseDataMapper.getAllForUser(userMail);

    if (error) {
      next(error);
    } else {
      response.json(result);
    }
  },

  // Fonction pour ajouter un achats dans la base de donnée
  // Utilise un objet JSON transmis via le body
  // Renvoi un objet JSON avec les données de l'achats nouvellement créer
  async savePurchase(request, response, next) {
    const newPurchase = request.body;

    const { error, result } = await purchaseDataMapper.create(newPurchase);

    if (error) {
      next(error);
    } else {
      response.json(result);
    }
  },

};

module.exports = purchaseController;
