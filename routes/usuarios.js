const { Router } = require("express");
const { check } = require("express-validator");
const { crearUsuario, getUsuario } = require("../controllers/usuarios");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", validarJWT, getUsuario);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("password", "El password es obligatorio").notEmpty(),
    check("email", "El Email es obligatorio").isEmail(),
    validarCampos,
  ],
  crearUsuario
);

module.exports = router;
