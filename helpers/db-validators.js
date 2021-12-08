const Role = require('../models/role');
const Usuario = require('../models/usuario');


const esRoleValido = async (rol = '') => {
  const existeRol = await Role.findOne({rol});
  if ( !existeRol ) {
    throw new Error(`El rol ${rol} no está registrado en la BD` )
  }
} 

const emailExiste = async( correo = '' ) => {
  const exiteEmail = await Usuario.findOne({correo: correo});
  if (exiteEmail) {
    throw new Error(`El correo ${correo} ya está registrado` )
  }
}

const existeUsuarioPorId = async( id = '' ) => {
  const existeUsuario = await Usuario.findById({id: id});
  if (!existeUsuario) {
    throw new Error(`El usuario con id ${id} no existe` )
  }
}


module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId
}