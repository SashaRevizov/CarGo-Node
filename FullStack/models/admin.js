const mongoose = require('mongoose')
const schema = mongoose.Schema

const adminSchema = new schema ({
    login: String,
    password: String
})

module.exports = mongoose.model('admins', adminSchema)