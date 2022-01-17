/* 
    Rutas de usuario / auth
    host  + /api/auth
*/

const { Router } = require('express');
const router = Router();
const { crearUsuario, loginUsuario, revalidarToken} = require('../controllers/authControllers');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

//Rutas
router.post('/new',
    [// middleware
        check('name','El nombre es requerido').not().isEmpty(),
        check('email','El email es requerido').isEmail(),
        check('password','El password debe tener como minimo 6 caracteres').isLength({ min: 6}),
        validarCampos // middleware personalizado
    ]
    , crearUsuario);
    
    router.post('/',
    [
        check('email','El email es requerido').isEmail(),
        check('password','El password debe tener como minimo 6 caracteres').isLength({ min: 6}),
        validarCampos  // middleware personalizado
        
    ], loginUsuario);

router.get('/renew', validarJWT, revalidarToken); // como validarJWT es un unico middleware no lo coloco entre []

module.exports =  router;