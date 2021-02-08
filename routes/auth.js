const { Router } = require("express");
const { login, renewToken, verificarToken } = require("../controllers/auth");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.post("/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio").notEmpty(),
    validarCampos,
  ],
  login
);

router.get("/renew", validarJWT, renewToken);

router.post("/verify", verificarToken );

module.exports = router;
