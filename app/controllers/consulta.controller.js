const knex = require('../config/database');

class ConsultaController {
  static async getAllConsultas(req, res) {
    try {
      const consultas = await knex('consulta_cliente').select('*');
      res.json({ consultas });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async getConsultaByIdConsulta(req, res) {
      try {
          const { id_consulta } = req.params; // Acceder al valor de la propiedad cod y convertirlo a cadena
          const consulta = await knex('consulta_cliente').where('id_consulta', String(id_consulta)).select('*');
          console.log(consulta);
          if (!consulta) {
              return res.status(404).json({ error: 'Consulta no encontrada' });
          }
          res.json({ consulta });
      } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Internal Server Error" });
      }
  }

  static async getConsultaByRutEmpleado(req, res) {
      try {
          const { rut_empleado } = req.params; // Acceder al valor de la propiedad cod y convertirlo a cadena
          const consulta = await knex('consulta_cliente').where('rut_empleado', String(rut_empleado)).select('*');
          console.log(consulta);
          if (!consulta) {
              return res.status(404).json({ error: 'Consulta no encontrada' });
          }
          res.json({ consulta });
      } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Internal Server Error" });
      }
  }

  static async createConsulta(req, res) {
    try {

      if (!req.body || !req.body.consulta) {
        // Maneja el caso en el que req.body o req.body.consulta no estén definidos
        console.log(req.body);
        return res.status(400).json({ error: 'El objeto consulta no está definido en el cuerpo de la solicitud' });
      }
      
      const { fecha_creacion, consulta, respuesta, rut_cliente, rut_empleado } = req.body.consulta;
      const nuevaConsulta = { fecha_creacion, consulta, respuesta, rut_cliente, rut_empleado };

      // Insertar el nueva consulta con el id proporcionado
      await knex('consulta_cliente').insert(nuevaConsulta);

      // Recuperar el producto recién insertado
      const consultaCreada = await knex('consulta_cliente').where(nuevaConsulta).first();

      res.status(201).json({ consulta: consultaCreada });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async updateRespuesta(req, res) {
    try {
      const { id_consulta } = req.params;
      const { respuesta } = req.body.consulta;

      const consultaActualizada = {};
      if (respuesta) consultaActualizada.respuesta = respuesta;

      await knex('consulta_cliente').where({ id_consulta }).update({ respuesta }, ['respuesta']);

      res.json({ consulta: consultaActualizada });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  
  static async updateConsulta(req, res) {
    try {
      const { id_consulta } = req.params;
      const { fecha_creacion, consulta, respuesta, rut_cliente, rut_empleado } = req.body.consulta;

      const consultaActualizada = {};
      if (fecha_creacion) consultaActualizada.fecha_creacion = fecha_creacion;
      if (consulta) consultaActualizada.consulta = consulta;
      if (respuesta) consultaActualizada.respuesta = respuesta;
      if (rut_cliente) consultaActualizada.rut_cliente = rut_cliente;
      if (rut_empleado) consultaActualizada.rut_empleado = rut_empleado;

      await knex('consulta_cliente').where({ id_consulta }).update({ fecha_creacion, consulta, respuesta, rut_cliente, rut_empleado }, ['fecha_creacion', 'consulta', 'respuesta', 'rut_cliente', 'rut_empleado']);

      const consultaActualizadaDB = await knex('consulta_cliente').where({ id_consulta }).first();

      res.json({ consulta: consultaActualizadaDB });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

}
  
module.exports = ConsultaController;