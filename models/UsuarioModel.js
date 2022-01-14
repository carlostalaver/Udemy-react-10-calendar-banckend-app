const { Schema, model } = require('mongoose');


const UsuarioSchema = Schema({
    name:{
        type: 'string',
        require: true
    },
    email:{
        type: 'string',
        require: true.valueOf,
        unique: true
    },
    password:{
        type: 'string',
        require: true
    },
});

module.exports = model('Usuario', UsuarioSchema);// Mongo creará una cloeccion llamada Usuarios, en plural, tomará el string usuario y lo pluraliza