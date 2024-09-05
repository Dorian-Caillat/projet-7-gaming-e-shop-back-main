# Installer la base de donnée du projet

## Environnement et technologies

Le back utilise [PostgreSQL](https://www.postgresql.org/).
Liste des des dépendances disponile sur le fichier package.json
Installation avec npm.
Afficher les scripts npm sur vscode.

- devlin : lance le serveur pour un environnement Linux.
- devWin : lance le serveur pour un environnement Windows.
- seedDB : alimente la base de donnée.

- sqitch revert : remet à 0 la base de donnée.
- sqitch deploy : deploie les tables.


## Participation

Seul les personnes qui ont accés au repo du projet sont autorisées à travailler dessus. 
Un workflow est mis en place pour permettre la validation des "push" et des "pull request".

## Instruction

- Se connecter au super utilisateur postgresql: ``psql -U postgres``
- Créer un user : ``CREATE USER 'votre_nom' WITH PASSWORD``
- Créer une db : ``CREATE DATABASE "ges" OWNER votre_nom``
- se deconnecter :``exit``
- lancer votre terminal, ``psql -U votre_nom -d ges -f data/seeding``
- commande ``sqitch deploy``

## Auteur du projet back

Romain Morel, Dorian Caillat