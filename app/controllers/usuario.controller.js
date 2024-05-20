const knex = require('../config/database');

class UsuarioController {
  static async getAllUsuarios(req, res) {
    try {
      const usuarios = await knex('usuario').select('id_usuario', 'correo', 'clave');
      res.json({ usuarios });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = UsuarioController;