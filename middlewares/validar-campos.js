const { response } = require('express');
const { validationResult } = require('express-validator');


/* Este es un meddleware personalizado que será llamado cuando necesite validar informacion que llega desde el front */
const validarCampos = (req, res= response, next) => {

    //manejo de errores
    const errores = validationResult( req );
    if ( !errores.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errores: errores.mapped()
        })        
    }


    next();
}

module.exports = {
    validarCampos
}