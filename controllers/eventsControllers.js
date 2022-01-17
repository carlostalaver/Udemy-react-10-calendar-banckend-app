const { response } = require('express'); 
const EventoModel = require('../models/EventoModel');


const getEventos = async (req, res = response) => {
    // console.log(req)
    const eventos = await EventoModel.find()
                                     .populate('user', 'name password'); // para poblar la info del la prod user, de todas las prod disponibles solo quiero poblar name y password(solo para mostrar el ejemplo)
                                    
    try {

        res.status(200).json({
            ok: true,
            eventos: eventos
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg:'Ocurrio un error al intentar obtener los eventos'
        })
    }
};


const crearEvento = async (req, res = response) => {

    /* Creo una instancia de mi modelo evento */
    const nuevoEvento = new EventoModel(req.body);

    
    try {
        nuevoEvento.user = req.uid;
        // console.log('nuevoEvento is: ',nuevoEvento);
         const eventoGuardado = await nuevoEvento.save();


        return res.status(200).json({
            ok: true,
            evento: eventoGuardado
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg:'Ocurrio un error al intentar crear el evento'
        })
    }
};


const actualizarEvento = async (req, res = response) => {
    const eventoId = req.params.id;
    try {
        
        const evento = await EventoModel.findById( eventoId );
        
        /* valido que el evento exista */
        if( !evento ){
          return  res.status(404).json({
                ok: false,
                msg: 'Event Not Found'
            });
        }

        /* valido que el usuario que quiera actualizar el evento sea el mismo que lo creó */
        if(evento.user.toString() !== req.uid) {
           return res.status(404).json({
                ok: false,
                msg: 'Usuario no tiene permisos para actualizar este evento'
            });
        }

        const eventoNuevo = {
            ...req.body,
            user: req.uid
        }

        // const eventoActualizado = await EventoModel.findByIdAndUpdate( eventoId, eventoNuevo, {new: false } ); // me entrega el evento antes de actualizarlo
        const eventoActualizado = await EventoModel.findByIdAndUpdate( eventoId, eventoNuevo, {new: true } );//  {new: true } es para que el metodo me retorne el objeto actualizado, si no se lo colocao mongo me retorna el objeto previo a ser actualizado


        return res.status(200).json({
            ok: true,
            evento: eventoActualizado
        });
        
    } catch (error) {
        console.log('Error ',error)
        res.status(500).json({
            ok: false,
            msg:'Ocurrio un error al intentar obtener el evento'
        })
    }
};

const eliminarEvento = async (req, res = response) => {
    // console.log(req)
    // const {, } = req.body;
    const eventoId = req.params.id;
    try {

        const evento = await EventoModel.findById( eventoId );
        
        /* valido que el evento exista */
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Event Not Found'
            });
        }

        /* valido que el usuario que quiera actualizar el evento sea el mismo que lo creó */
        if (evento.user.toString() !== req.uid) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no tiene permisos para eliminar este evento'
            });
        }

        await EventoModel.findByIdAndDelete( eventoId );

        res.status(200).json({
            ok: true,
            msg:`Evento con id ${ eventoId } ha sido eliminado`
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error al intentar crear el usuario'
        })
    }
};

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}