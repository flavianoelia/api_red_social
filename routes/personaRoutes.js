const express = require("express");
const router = express.Router();
const personaController = require("../controllers/personaController");

router.get("/", personaController.home);
router.get("/list", personaController.list);
router.post("/create", personaController.create);
router.get("/info/:id", personaController.findById);
router.put("/update/:id", personaController.update);
router.get("/buscar", personaController.buscarPorNombre);
router.delete("/delete/:id", personaController.deletePersona);

module.exports = router;