const { Router } = require('express');

// Importation du controllers
const { userController } = require('../controller');

// Importation du systeme de validation
const validationFactory = require('../service/validation/validations');

// Importation des schemas de validation
const { sendUserData, editUserData, loginUserData } = require('../service/validation/schemas/userShema');

const router = Router();

// Route pour récupérer tout les utilisateurs enregistrer dans la base de donnée
router.get('/', userController.getAllUsers);

// Route pour enregistrer un utilisateur dans la base de donnée
// Vérification des données du body envoyer depuis le front via un schema Joi
router.post('/', validationFactory(sendUserData, 'body'), userController.addUser);

// Route pour vérifier la connexion d'un client sur le site
// Vérification des données du body envoyer depuis le front via un schema Joi
router.post('/login', validationFactory(loginUserData, 'body'), userController.login);

// Route pour récupérer un utilisateur précis (via son mail)
router.get('/:mail', userController.getOneUser);

// Route pour modifier un utilisateur précis (via son mail).
// Methode "PUT" utilisé pour réécrire toute les informations du jeu modifier
// Vérification des données du body envoyer depuis le front via un schema Joi
router.put('/:mail', validationFactory(editUserData, 'body'), userController.editUser);

// Route pour supprimé un utilisateur précis (via son mail)
router.delete('/:mail', userController.deleteUser);

module.exports = router;
