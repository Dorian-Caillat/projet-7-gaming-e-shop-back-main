const { Router } = require('express');

// Importation du controllers
const { purchaseController } = require('../controller');

// Importation du systeme de validation
const validationFactory = require('../service/validation/validations');

// Importation des schemas de validation
const { savePurchase } = require('../service/validation/schemas/purchaseSchema');

const router = Router();

// Route pour récupérer tout les achats enregistrer dans la base de donnée
router.get('/', purchaseController.getAll);

// Route pour enregistrer un achat dans la base de donnée
// Vérification des données du body envoyer depuis le front via un schema Joi
router.post('/', validationFactory(savePurchase, 'body'), purchaseController.savePurchase);

// Route pour récupérer tout les achats d'un utilisateur précis (via son mail)
router.get('/:user_mail', purchaseController.getAllForUser);

module.exports = router;
