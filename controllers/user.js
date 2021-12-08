const { response } = require('express')
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const usuariosGet = async (req, res = response) => {

  const { limite = 5 } = req.query
  const query = { estado: true }

  // const usuarios = await Usuario.find(query)
  // .limit(Number(limite));

  // const total = await Usuario.countDocuments(query);

  const [ total, usuarios ] = await Promise.all([ 
    Usuario.countDocuments(query),
    Usuario.find(query)
      .limit(Number(limite))
  ]);

  res.json({
    total,
    usuarios
  }) 
}

const usuariosPost = async (req, res = response) => {

  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario( {nombre, correo, password, rol} );

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync( password, salt );

  // Guardar en BD
  await usuario.save();

  res.json({
    msg: "post API - controlador",
    usuario
  }) 
}

const usuariosPut = async(req, res = response) => {

  const { id } = req.params;
  const { password, google, correo, ...resto } = req.body;

  // Validar
  if ( password ) {
     // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync( password, salt );
  }

  const usuario = await Usuario.findByIdAndUpdate( id, resto );

  res.json({
    msg: "put API - controlador",
    usuario
  }) 
}

const usuariosDelete = async (req, res = response) => {

  const { id } = req.params;

  // Fisicamente lo borramos
  // const usuario = await Usuario.findByIdAndDelete( id );

  const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } ) 

  res.json({
    id,
    usuario
  }) 
}



module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete
}





