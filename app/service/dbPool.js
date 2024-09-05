require('dotenv').config();
const { Pool } = require('pg');

// Pool connecter à une DB distante
// l'IP de la DB distante est sauvegarder dans le .env: DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,
  },
});

// Pool connecter à une DB local
// const pool = new Pool();
// pool.connect();

module.exports = pool;
