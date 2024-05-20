const knex = require('../config/database');

const Consulta = () => {
  return knex.schema.createTable('consulta_cliente', function (table) {
    table.increments('id_consulta').primary();
    table.string('fecha_creacion').notNullable();
    table.string('consulta').notNullable();
    table.string('respuesta');
    table.integer('rut_cliente').notNullable();
    table.integer('rut_empleado').notNullable();
  });
};

module.exports = Consulta;