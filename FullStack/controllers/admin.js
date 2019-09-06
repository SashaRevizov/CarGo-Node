const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Admin = require('../models/admin')
const User = require('../models/client')
const Transporter = require('../models/transporter')
const Order = require('../models/order')
const errorHandler = require('../utils/errorHandler')
const keys = require('../config/keys')


module.exports.login = async (req, res) =>{
    const candidate = await Admin.findOne({login: req.body.login})
    if (candidate){
        const valid = await bcrypt.compare(req.body.password, candidate.password)
            if (valid) {
                const token = jwt.sign({
                    login: candidate.login,
                    userId: candidate._id
                }, keys.jwt)

                res.status(200).json({
                    token: `Bearer ${token}`
                })
            } else {
                res.status(401).json({
                    message: 'Невірний пароль'
                })
            }
        }
     else {
        res.status(404).json({
            message: 'Немає доступу'
        })
    }
}
module.exports.getOrders = async (req, res) =>{
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (error) {
        errorHandler(res, error)
    }
}
module.exports.delOrder = async (req, res) =>{
    try {
        await Order.remove({_id: req.params.id})
        res.status(200).json({
          message: 'Замовлення видалено'
        })
      } catch (e) {
        errorHandler(res, e)
      }
}
module.exports.getTransporters = async (req, res) =>{
    try {
        const transporters = await Transporter.find()
        res.status(200).json(transporters)
    } catch (error) {
        errorHandler(res, error)
    }
}
module.exports.confirmTransporter = async (req, res) =>{
    try {
        const user = await Transporter.findOneAndUpdate(
            {_id: req.body._id},
            {$set: {confirmed: true}},
            {new: true}
        )
        res.status(200).json({
            message: 'Підтверджено'
        })
    } catch (error) {
        errorHandler(res, error)
    }
}
module.exports.delTransporter = async (req, res) =>{
    try {
        await Transporter.remove({_id: req.params.id})
        res.status(200).json({
          message: 'Видалено'
        })
      } catch (e) {
        errorHandler(res, e)
      }
}
module.exports.getClients = async (req, res) =>{
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        errorHandler(res, error)
    }
}
module.exports.delClient = async (req, res) =>{
    try {
        await User.remove({_id: req.params.id})
        res.status(200).json({
          message: 'Видалено'
        })
      } catch (e) {
        errorHandler(res, e)
      }
}