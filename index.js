// ###########################################################################################\
//   _____                       _                             _____   _                      |
//  / ____|                     (_)                           / ____| | |                     |
// | |  __    __ _   _ __ ___    _   _ __     __ _      ___  | (___   | |__     ___    _ __   |
// | | |_ |  / _` | | '_ ` _ \  | | | '_ \   / _` |    / _ \  \___ \  | '_ \   / _ \  | '_ \  |
// | |__| | | (_| | | | | | | | | | | | | | | (_| |   |  __/  ____) | | | | | | (_) | | |_) | |
//  \_____|  \__,_| |_| |_| |_| |_| |_| |_|  \__, |    \___| |_____/  |_| |_|  \___/  | .__/  |
//                                            __/ |                                   | |     |
//                                           |___/                                    |_|     |
//                                                                                            |
// ###########################################################################################/
//                                        |
//    GamingEShop-API v1.0                |
//    Réalisé par Romain M et Dorian C   /
//                                      /
// ####################################/

// Importation des variables d'environements
require('dotenv').config();

// Importation des modules important
const debug = require('debug')('G-eShop:server');
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Importation des middlewares locaux
const router = require('./app/router');

// Creation d'une web-app avec express
const app = express();

const corsOptions = {
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Autoriser l'envoi de cookies depuis le navigateur
  optionsSuccessStatus: 204,
};

// Mise en statique de l'image placeholder
app.use('/src/picture', express.static(path.join(__dirname, 'src/picture')));

// Configuration d'express
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(router);

// Definition du port du serveur et lancement de la web-app
const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => debug(`Server started at http://localhost:${PORT}`));
