const { Router } = require('express');

// Importation des routes customs
const plateformRouter = require('./plateformRouter');
const purchaseRouter = require('./purchaseRouter');
const userRouter = require('./userRouter');
const gameRouter = require('./gameRouter');

// Creation de l'objet router
const router = Router();

// Base des routes pour les plateformes
router.use('/plateform', plateformRouter);

// Base des routes pour l'histoire d'achat
router.use('/purchase', purchaseRouter);

// Base des routes pour les informations des utilisateurs
// et des systèmes de connexion/inscription
router.use('/user', userRouter);

// Base des routes pour les jeux
router.use('/game', gameRouter);

module.exports = router;
