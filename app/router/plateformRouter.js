const { Router } = require('express');

// Importation du controllers
const { plateformController } = require('../controller');

// Importation du systeme de validation

const router = Router();

// Route pour récupérer toutes les plateformes enregistrer dans la base de donnée
router.get('/', plateformController.getAllPlateform);

// Route pour récupérer une plateforme précise (via son slug)
router.get('/:slug', plateformController.getOnePlateform);

module.exports = router;
