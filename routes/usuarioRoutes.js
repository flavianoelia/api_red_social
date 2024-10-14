const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const auth = require("../middlewares/authmiddleware");
const upload = require("../middlewares/uploadmiddleware");


router.post("/register", usuarioController.register);
router.put("/me/:id", auth, upload.single('avatar'), usuarioController.update);