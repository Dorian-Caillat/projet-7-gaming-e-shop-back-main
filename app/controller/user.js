require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userDataMapper = require('../datamapper/user');

const SECRET_KEY = process.env.SECRET_KEY;

const userController = {

  // Fonction qui va requêter tout les users enregistrer dans la base de donnée
  // Renvoi un tableau d'objet JSON avec les informations des utilisateurs (Hors mots de passe)
  async getAllUsers(_, response, next) {
    const { error, result } = await userDataMapper.getAll();

    if (error) {
      next(error);
    } else {
      response.json(result);
    }
  },

  // Fonction qui va requêter un user enregistrer dans la base de donnée
  // Renvoi un tableau d'objet JSON avec les informations d'un utilisateur
  // (Hors mots de passe) via son mail
  async getOneUser(request, response, next) {
    const userMail = request.params.mail;

    const { error, result } = await userDataMapper.getOne(userMail);

    if (error) {
      next(error);
    } else {
      response.json(result);
    }
  },

  // Fonction pour ajouter un utilisateur dans la base de donnée
  // Utilise un objet JSON transmis via le body
  // Renvoi un objet JSON avec les données de l'utilisateur nouvellement créer
  async addUser(request, response, next) {
    // Récupération des données
    // Les données sont déjà vérifiées
    const newUser = request.body;

    // Hashage du mot de passe
    const hash = bcrypt.hashSync(newUser.password, 10);
    newUser.password = hash;

    // Création de l'entré dans la base de données
    const { error, result } = await userDataMapper.create(newUser);

    if (error) {
      next(error);
    } else {
      response.json(result);
    }
  },

  // Fonction pour modifier un utilisateur de la base de donnée
  // Réécrit toutes les informations depuis un objet JSON
  // L'utilisateur est trier par son mail
  async editUser(request, response, next) {
    const userMail = request.params.mail;
    const userData = request.body;

    userData.mail = userMail;

    const { error, result } = await userDataMapper.update(userData);

    if (error) {
      next(error);
    } else {
      delete result.id;
      response.json(result);
    }
  },

  // Fonction pour supprimer un utilisateur de la base de donnée
  // L'utilisateur est sélectionné par son mail
  async deleteUser(request, response, next) {
    const userMail = request.params.mail;

    // eslint-disable-next-line no-unused-vars
    const { error, result } = await userDataMapper.delete(userMail);

    if (error) {
      next(error);
    } else {
      response.json({ deleteuser: userMail });
    }
  },

  // Fonction pour vérifier la connexion d'un utilisateur
  // Vérification du lien "mail"/"password" par rapport au information de la BDD
  // Utilisation de bcrypt pour vérifier le mot de passe hashé
  //
  // eslint-disable-next-line consistent-return
  async login(req, res, next) {
    const { mail, password } = req.body;

    try {
      // Récupération de l'utilisateur via son mail
      const { error, result } = await userDataMapper.findWithPassword(mail);

      // Renvoi de l'erreur si une erreur SQL est produite
      if (error) throw error;
      const user = result; // Si aucune erreur trouvé, on sauvegarde le résultat obtenu

      // Test si l'utilisateur est valide
      // console.log(user);

      if (!user) {
        return res.status(401).json({ message: 'identifiant fourni invalide' });
      }

      // Test si le mot de passe donnée est valide par rapport à au password hashé
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: 'Mot de passe fourni invalide' });
      }

      // Génération du jwt
      const token = jwt.sign({ id: user.id, mail: user.mail }, SECRET_KEY, { expiresIn: '1h' });
      return res.cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.COOKIE,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
        .status(200)
        .json(user);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;
