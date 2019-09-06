const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const schema = mongoose.Schema
autoIncrement.initialize(mongoose.connection)
const orderSchema = new schema ({
    orderNum: {
        type: String,
        min: 8,
        incrementBy: 1
    },
    startCity: String,
    endCity: String,
    startAdress: String,
    endAdress: String,
    clientName: String,
    clientPhone: String,
    type: String,
    length: Number,
    width: Number,
    height: Number,
    weight: Number,
    status: String,
    user: {
        ref: 'users',
        type: mongoose.Types.ObjectId
    },
    dateStart: String,
    dateEnd: String,
    price: String,
    transporter: {
        ref: 'transporters',
        type: mongoose.Types.ObjectId
    },
    transporterName: String,
    transporterPhone: String
})
orderSchema.plugin(autoIncrement.plugin, { model: 'orders', field: 'orderNum' })
module.exports = mongoose.model('orders', orderSchema)