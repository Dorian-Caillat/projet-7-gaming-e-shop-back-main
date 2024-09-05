const { Router } = require('express');

// Importation du controllers
const { gameController } = require('../controller');

// Importation du systeme de validation
const validationFactory = require('../service/validation/validations');

// Importation des schemas de validation
const { publishGame } = require('../service/validation/schemas/gameSchema');

const router = Router();

// Route pour récupérer tout les jeux enregistrer dans la base de donnée
router.get('/', gameController.getAllGames);

// Route pour enregistrer un jeu dans la base de donnée
// Vérification des données du body envoyer depuis le front via un schema Joi
router.post('/', validationFactory(publishGame, 'body'), gameController.publishGame);

// Route pour récupérer un jeu précis (via son slug)
router.get('/:slug', gameController.getOneGame);

// Route pour modifier un jeu précis (via son slug).
// Methode "PUT" utilisé pour réécrire toute les informations du jeu modifier
// Vérification des données du body envoyer depuis le front via un schema Joi
router.put('/:slug', validationFactory(publishGame, 'body'), gameController.editGame);

// Route pour supprimé un jeu précis (via son slug)
router.delete('/:slug', gameController.deleteGame);

// Route pour récupérer tout les jeux d'une plateforme précise
router.get('/plateform/:plateformSlug', gameController.getAllGameForPlateform);

module.exports = router;
