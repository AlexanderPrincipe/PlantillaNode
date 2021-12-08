const { Router } = require('express');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/user');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');


const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom( existeUsuarioPorId ),
  check('rol').custom( esRoleValido ),
  // validarCampos
], usuariosPut);

router.post('/', [
  check('correo', 'El correo no es válido').isEmail(),
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password es obligatorio y más de 6 letras').isLength({min:6}),
  check('correo').custom(emailExiste),
  // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
  check('rol').custom( esRoleValido ),
  validarCampos
], usuariosPost);

router.delete('/:id', [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom( existeUsuarioPorId ),
], usuariosDelete);








module.exports = router;