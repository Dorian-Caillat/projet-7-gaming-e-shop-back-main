const { gameDataMapper } = require('../datamapper');

const gameController = {

  // Fonction qui va requêter tout les jeux enregistrer dans la base de donnée
  // Renvoi un tableau d'objet JSON avec les jeux et leurs informations
  async getAllGames(_, response, next) {
    const { error, result } = await gameDataMapper.getAll();

    if (error) {
      next(error);
    } else {
      response.json(result);
    }
  },

  // Fonction qui va requêter tout les users enregistrer dans la base de donnée
  // Renvoi un tableau d'objet JSON avec les informations d'un jeu via son slug
  async getOneGame(request, response, next) {
    const gameSlug = request.params.slug;

    const { error, result } = await gameDataMapper.getOne(gameSlug);

    if (error) {
      next(error);
    } else {
      response.json(result);
    }
  },

  // Fonction qui va requêter tout les jeux enregistrer dans la base de donnée
  // Renvoi un tableau d'objet JSON avec les jeux pour une plateforme spécifique
  async getAllGameForPlateform(request, response, next) {
    const plateformSlug = request.params.plateformSlug;

    const { error, result } = await gameDataMapper.getAllForPlateform(plateformSlug);

    if (error) {
      next(error);
    } else {
      response.json(result);
    }
  },

  // Fonction pour ajouter un jeu dans la base de donnée
  // Utilise un objet JSON transmis via le body
  // Renvoi un objet JSON avec les données du jeu nouvellement ajouté
  async publishGame(request, response, next) {
    const newGame = request.body;

    const { error, result } = await gameDataMapper.create(newGame);

    if (error) {
      next(error);
    } else {
      response.json(result);
    }
  },

  // Fonction pour modifier un jeu de la base de donnée
  // Réécrit toutes les informations depuis un objet JSON
  // Le jeu est trier via son slug
  async editGame(request, response, next) {
    const gameSlug = request.params.slug;
    const gameData = request.body;

    gameData.slug = gameSlug;

    const { error, result } = await gameDataMapper.update(gameData);

    if (error) {
      next(error);
    } else {
      response.json(result);
    }
  },

  // Fonction pour supprimer un jeu de la base de donnée
  // Le jeu est sélectionné par son slug
  async deleteGame(request, response, next) {
    const gameSlug = request.params.slug;

    const { error } = await gameDataMapper.delete(gameSlug);

    if (error) {
      next(error);
    } else {
      response.json({ deleteGame: gameSlug });
    }
  },
};

module.exports = gameController;
