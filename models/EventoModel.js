const { Schema, model } = require('mongoose');


const EventoSchema = Schema({
    title: {
        type: 'string',
        required: true,
    },
    notes: {
        type: 'string'
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId, // esto le dice a moongose que el type de user será una referencia que se especifica d ela siguiente manera
        ref: 'Usuario', // ojo que se debe llamar igual al Schema Usuario
        required: true
    }

});

/* Sobreescribo la respuesta que me da el servidor una vez haya hecho el guardado de la info del evento */
EventoSchema.method('toJSON', function () {
    // console.log('Ver this: ', this);
    // console.log('Ver this.toObject(): ', this.toObject());
    const { _id, __v, ...object } = this.toObject();
    console.log('Ver object: ', object);
    object.id = _id; // creo una prop llamda id y le asigno el valor de _id, esto es para no enviarle al front una pro con nombre _id ni ina con nombre la __v
    return object;
})

module.exports = model('Evento', EventoSchema);// Mongo creará una cloeccion llamada Usuarios, en plural, tomará el string usuario y lo pluraliza