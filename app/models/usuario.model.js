const knex = require('../config/database');

const Usuario = () => {
  return knex.schema.createTable('usuario', function (table) {
    table.increments('id_usuario').primary();
    table.string('correo').notNullable();
    table.string('clave').notNullable();
  });
};

module.exports = Usuario;