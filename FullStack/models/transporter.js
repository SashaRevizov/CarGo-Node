const mongoose = require('mongoose')

const schema = mongoose.Schema

const transporterSchema = new schema({
    name:  {
        type: String
    },

    surname: {
        type: String
        
    },

    phone: {
        type: String
        
        
    },
    document: {
        type: String,
        default: ''
    },
   
   
    email: {
        type: String
    
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    secretToken:{
        type: String
    },
    password: {
        type: String
    }
})


module.exports = mongoose.model('transporters', transporterSchema)