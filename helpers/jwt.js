const jwt = require('jsonwebtoken');

const generarJWT = ( uid, name ) => {
    
    return new Promise((resolve, reject ) => {

        const payload = { uid: uid, name: name };

        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn:'2h'
        }, (err, TokenEncoded) => { // este callback se dispara si hay un error o si se generar el token, en ambos casos se dispara

            if ( err ){
                console.log("No se pudo generar el token ", err);
                reject('No se pudo generar el token');
            }

            resolve( TokenEncoded );

        })

    })

}


module.exports = {
    generarJWT
}