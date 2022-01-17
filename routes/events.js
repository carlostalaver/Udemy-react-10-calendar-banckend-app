
/* 
    Event Routes
    /api/events

*/

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/eventsControllers');
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
// aqui le indico que para cualquier peticion que esté debajo de esta  de esta instruccion debe validar el token,
// de esta manera evito colocar el validarJWT en cada una de las llamadas a los endpoint
router.use( validarJWT );

//obtener eventos
router.get('/', getEventos ); //validarJWT es un meddleware, por lo paso solito sin usar []

//Crear evento
router.post('/',[
    check('title', 'El titulo es requerido').not().isEmpty(),
    check('start', 'La fecha de inicio es requerida').custom( isDate ),
    check('end', 'La fecha de finalización es requerida').custom( isDate ),
    validarCampos
], crearEvento );

//Actualizar evento
router.put('/:id', actualizarEvento );

//Eliminar evento
router.delete('/:id', eliminarEvento );


module.exports = router;