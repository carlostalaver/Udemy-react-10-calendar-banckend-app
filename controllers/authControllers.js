const bcrypt = require('bcryptjs');
const { response } = require('express'); // aqui importo nuevamente el express para no perder la ayuda de intellicense
const { generarJWT } = require('../helpers/jwt');
const UsuarioModel = require('../models/UsuarioModel');


const crearUsuario = async (req, res = response) => {
    const {email, password} = req.body;
    try {
        
        let usuario = await UsuarioModel.findOne( {email: email }); // primero busco si existe ya un usuario registrado con el email que manda el front
        
        
        if ( usuario ) {
            res.status(400).json({
                ok: false,
                msg:`Ya existe un usuario registrado con el email ${ email }`
            });
        }
        
        
        usuario = new UsuarioModel( req.body );
        
        // encrypto la contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        // grabo en la  BBDD
        await usuario.save();
        
        //genero el token
        const token = await generarJWT( usuario.id, usuario.name );
        
        return res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
        
    } catch (error) {
        console.log("Crear usuario: ", error);
       return res.status(500).json({
            ok: false,
            msg:'Ocurrio un error al intentar crear el usuario'
        })
    }
};


const loginUsuario = async (req , res = response) => {

    const { email, password } = req.body;

    try {

        let usuario = await UsuarioModel.findOne({email: email}); // primero busco si existe ya un usuario registrado con el email que manda el front

        if ( !usuario ) {
            res.status(400).json({
                ok: false,
                msg:`El usuario no existe con el email ${ email }` // lo ideal es indicar que el password o email son incorrectos, no decir que es uno o el otro
            });
        }

        // validar que el password enviado hace match con el almacenado en BBDD
        const validPassword =  bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password invalido'
            })
        }
        // generar el JWT
        const token = await generarJWT( usuario.id, usuario.name );

        return res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token: token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg:'Por favor comuniquese con el administrador'
        })
    }

};

const revalidarToken = async(req , res = response) => {

    const { uid, name } = req;

      //genero el token
    const token = await generarJWT( uid, name );

    return res.json({
        ok: true,
        uid,
        name,
        token
    })
};

module.exports = {
    crearUsuario: crearUsuario,
    loginUsuario,
    revalidarToken
}