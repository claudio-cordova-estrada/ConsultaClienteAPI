const express = require("express");
const router = express.Router();
const ConsultaController = require("../controllers/consulta.controller");
//const authMiddleware = require("../middlewares/auth.middleware") 

router.get("/", ConsultaController.getAllConsultas);
router.get("/:id_consulta/", ConsultaController.getConsultaByIdConsulta);
router.get("/empleado/:rut_empleado/", ConsultaController.getConsultaByRutEmpleado);
router.post("/nueva_consulta/", ConsultaController.createConsulta);
router.patch("/update_respuesta/:id_consulta/", ConsultaController.updateRespuesta);
router.put("/update_consulta/:id_consulta/", ConsultaController.updateConsulta)

module.exports = router;

