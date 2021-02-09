const fs = require("fs");
const Usuario  = require('../models/usuario');

const borrarImagen = (path) => {
  if (fs.existsSync(path)) {
    //borrar la img anterior
    fs.unlinkSync(path);
  }
};
//al ser async devuelve promesa
const actualizarImagen = async (tipo, id, nombreArchivo) => {
  
  let pathViejo = "";
  
  const user = await Usuario.findById(id);
  
  switch (tipo) {
    case "usuario":
  
        pathViejo = `../uploads/usuarios/${user.imagen}`;

        borrarImagen(pathViejo);

        user.imagen = nombreArchivo;
        await user.save();
        return true;

      break;
  }
};

module.exports = {
  actualizarImagen,
};
