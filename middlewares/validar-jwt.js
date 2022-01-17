
const { response } = require('express');
const jwt = require('jsonwebtoken');
const validarJWT = (req, res = response, next) => {

    // x-token vendra en el Header, ojo, cuando son Headers personalizados se recomienda usar un prefijo, en mi caso uso x-nombreHeader
    const token = req.header('x-token');

    
    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No existe token en los headers de la peticion'
            
        })
    }
    
    try {
        
        const { uid, name } = jwt.verify( token, process.env.SECRET_JWT_SEED );
        // console.log(jwt.verify(token, process.env.SECRET_JWT_SEED));
        req.uid = uid;
        req.name = name;
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token Invalido'

        })
    }
    
    // console.log(token);

    next();
}

module.exports = {
    validarJWT
}