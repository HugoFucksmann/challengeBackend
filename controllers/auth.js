const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJWT, verificarJWT } = require("../helpers/jwt");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const usuarioDB = await Usuario.findOne({ email });

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "email no encontrado",
      });
    }
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);

    if (!validPassword) {
      return res.status(404).json({
        ok: false,
        msg: "password no valido",
      });
    }
    
    const token = await generarJWT(usuarioDB.id);
    
    res.json({
      ok: true,
      token
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const renewToken = async (req, res) => {
 
  const {token} = req.token
   const verify = await verificarJWT(token);

   res.json({
    ok: true,
    verify
  });
};

const verificarToken = async (req, res) => {
  try {
    const {token} = req.body
    console.log(token);
   const verify = await verificarJWT(token);
  
   res.json({
      ok: true,
      verify
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      ok: false,
      verify: false
    })
  }
  
}



module.exports = {
  login,
  renewToken,
  verificarToken
};