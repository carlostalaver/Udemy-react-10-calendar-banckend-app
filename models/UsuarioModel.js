const { Schema, model } = require('mongoose');


const UsuarioSchema = Schema({
    name:{
        type: 'string',
        required: true,
    },
    email:{
        type: 'string',
        required: true,
        unique: true
    },
    password:{
        type: 'string',
        required: true
    },
});

module.exports = model('Usuario', UsuarioSchema);// Mongo creará una cloeccion llamada Usuarios, en plural, tomará el string usuario y lo pluraliza