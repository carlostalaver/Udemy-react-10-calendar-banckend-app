const moment = require('moment');

const  isDate = ( value, meta ) => {

    // console.log(meta);

    if(!value) return;

    const fecha = moment(value);
    return fecha.isValid();
}

module.exports = {
    isDate: isDate
}