const mongoose = require('mongoose')
const schema = mongoose.Schema

const citySchema = new schema ({
    name: String,
    oblast: String
})

module.exports = mongoose.model('cities', citySchema)