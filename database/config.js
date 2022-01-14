const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
           /*  useCreateIndex: true */ // lo comenté porque con esta prop no extablece la conexion  mongodb
        });

        console.log('BBDD on line...!')
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectarse a la BBDD, ', error);
    }

}


module.exports = {
    dbConnection
}