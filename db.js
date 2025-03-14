const knex = require('knex');
const { Model } = require('objection');

// Configurar conexión a SQLite
const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './users.db'
  },
  useNullAsDefault: true
});

// Vincular Objection.js con Knex
Model.knex(db);

module.exports = db;
