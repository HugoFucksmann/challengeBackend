const { Router } = require("express");
const { check } = require("express-validator");
const { crearUsuario, getUsuarios } = require("../controllers/usuarios");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.post(
  "/",
  [
    check("password", "El password es obligatorio").notEmpty(),
    check("email", "El Email es obligatorio").isEmail(),
    validarCampos,
  ],
  crearUsuario
);

router.get("/", validarJWT, getUsuarios);

module.exports = router;
