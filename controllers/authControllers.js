const {response } = require('express'); // aqui importo nuevamente el express para no perder la ayuda de intellicense
const { validationResult } = require('express-validator');

const crearUsuario =  (req , res = response) => {
    // console.log(req)

    const {name, email, password} = req.body;

    //manejo de errores
    const errores = validationResult( req );
    if ( !errores.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errores: errores.mapped()
        })        
    }
    res.status(201).json({
        ok: true,
        msg:'registro',
        name,
        email,
        password
    })
};


const loginUsuario = (req , res = response) => {

    const {email, password} = req.body;
    
    //manejo de errores
    const errores = validationResult( req );
    if ( !errores.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errores: errores.mapped()
        })        
    }
    res.json({
        ok: true,
        msg:'login',
        email,
        password
    })
};

const revalidarToken = (req , res = response) => {
    res.json({
        ok: true,
        msg:'renew'
    })
};

module.exports = {
    crearUsuario: crearUsuario,
    loginUsuario,
    revalidarToken
}