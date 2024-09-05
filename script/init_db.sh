# 0. Je prends l'identité de postgres
export PGUSER=postgres

# 1. Création de la BDD
createdb ges

# 2. Création des tables
psql -d ges -f ./SQL/create_tables.sql

# 3. Création des fonctions
psql -d ges -f ./SQL/create_function.sql

# 4. Ajout de quelques données de base
psql -d ges -f ./SQL/seed_tables.sql