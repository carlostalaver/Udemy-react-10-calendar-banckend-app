/* 
    Rutas de usuario / auth
    host  + /api/auth
*/

const { Router } = require('express');
const routes = Router();
const { crearUsuario, loginUsuario, revalidarToken} = require('../controllers/authControllers');
const { check } = require('express-validator');


//Rutas
routes.post('/new',
    [// middleware
        check('name','El nombre es requerido').not().isEmpty(),
        check('email','El email es requerido').isEmail(),
        check('password','El password debe tener como minimo 6 caracteres').isLength({ min: 6}),
    ]
    ,crearUsuario);
    
    routes.post('/',
    [
        check('email','El email es requerido').isEmail(),
        check('password','El password debe tener como minimo 6 caracteres').isLength({ min: 6}),
        
    ],
    loginUsuario);

routes.get('/renew', revalidarToken);

module.exports =  routes;