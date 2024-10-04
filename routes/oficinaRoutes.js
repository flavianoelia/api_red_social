const express = require("express");
const router = express.Router();
const oficinaController = require("../controllers/oficinaController");
const auth = require("../middlewares/authmiddleware");

router.get("/", oficinaController.home);
router.get("/list", oficinaController.list);
router.post("/create", auth, oficinaController.create);
router.get("/info/:id", oficinaController.findById);
router.put("/update/:id", oficinaController.update);
router.get("/buscar", oficinaController.buscarPorNombre);
router.delete("/delete/:id", oficinaController.deleteOficina);

module.exports = router;