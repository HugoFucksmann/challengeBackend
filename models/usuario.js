const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  imagen: {
    type: String,
    default: ''
  }
});

//para cambiar algun parametro, config global (ej: _id por id)
UsuarioSchema.method("toJSON", function () {
  const { __v, _id, password, ...Object } = this.toObject();

  Object.uid = _id;
  return Object;
});

module.exports = model("Usuario", UsuarioSchema);
