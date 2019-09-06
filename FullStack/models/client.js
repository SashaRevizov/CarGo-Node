const mongoose = require('mongoose');
const schema = mongoose.Schema;

const clientSchema = new schema ({
    name:  {
        type: String,
        
    },

    surname: {
        type: String,
        
    },

    phone: {
        type: String,
        
        
    },
    email: {
        type: String,
     
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    secretToken:{
        type: String,
       
    },
    password: {
        type: String,
       
    }


});
module.exports = mongoose.model('client', clientSchema);