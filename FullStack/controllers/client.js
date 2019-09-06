const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const randomString= require('randomstring')



const errorHandler = require('../utils/errorHandler')
const Client = require('../models/client')
const Cities = require('../models/city')
const Order = require('../models/order')
const Transporter = require('../models/transporter')
const keys = require('../config/keys')
const mail = require('../utils/sendMail')
const mailRef = require('../utils/sendMailRefresh')


module.exports.login = async (req, res)=>{

    const candidate = await Client.findOne({email: req.body.email})
    if (candidate){
        if (!candidate.confirmed){
            res.status(406).json({
                message: 'Email не підтверджено'
            })
        } else {
            const valid = await bcrypt.compare(req.body.password, candidate.password)
            if (valid) {
                const token = jwt.sign({
                    email: candidate.email,
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
    } else {
        res.status(404).json({
            message: 'Користувач не знайден'
        })
    }
}

module.exports.register = async function (req, res){

    const candidate = await Client.findOne({email: req.body.email})
    if (candidate){
        res.status(409).json({
            message: 'Email вже використовується'
        })
    } else {
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const rand = randomString.generate()
            const user = new Client({
                name: req.body.name,
                surname: req.body.surname,
                phone: req.body.phone,
                email: req.body.email,
                secretToken: rand,
                password: bcrypt.hashSync(password, salt)
            })
            try {
                await user.save()
                mail(req,req.body.email,rand).catch(console.error)
                res.status(201).json({
                    message: 'Користувач успішно створений'
                })
            } catch (error) {
                errorHandler(res, error)
            }





    }


}

module.exports.refresh = async (req, res)=>{

    try {
        const candidate = await Client.findOne({email: req.body.email})
        const randPass = randomString.generate(6)
        if (candidate.secretToken){
           
            mailRef(req,req.body.email,candidate.secretToken, randPass)
            res.status(200).json({
                message: "Успіх"
            })
        } else {
            res.status(500).json({
                message: "Нема токена"
            })
        }

    } catch (error) {
        errorHandler(res, error)
    }
}
module.exports.newPassUrl = async (req,res)=>{
    try {
        const salt = bcrypt.genSaltSync(10)
        const password = req.query.pass
        const candidate = await Client.findOneAndUpdate(
            {secretToken: req.query.token},
            {$set: {password: bcrypt.hashSync(password, salt)}},
            {new: true}
    )
        res.status(200).redirect("http://localhost:4200/client?registered=true")

    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.profileView = async (req, res)=>{
    try {
        const user = await Client.findById({_id: req.user.id})
        res.status(200).json(user)
    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.profileUpdate = async (req, res)=>{
    const salt = bcrypt.genSaltSync(10)
    const password = req.body.password
    try {
        const user = await Client.findOneAndUpdate(
            {_id: req.user.id},
            {$set: {password: bcrypt.hashSync(password, salt)}},
            {new: true}
        )
        res.status(200).json({
            message: 'Пароль змінено'
        })
    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.createOrder = async (req, res)=>{
    const user = await Client.findById({_id: req.user.id})
    var today  = new Date();

    const order = new Order({
        startCity: req.body.startCity,
        endCity: req.body.endCity,
        startAdress: req.body.startAdress,
        endAdress: req.body.endAdress,
        clientName: user.name,
        clientPhone: user.phone,
        type: req.body.type,
        length: req.body.length,
        width: req.body.width,
        height: req.body.height,
        weight: req.body.weight,
        user: req.user.id,
        dateEnd: req.body.dateEnd,
        dateStart: req.body.dateStart,
        transporter: null,
        transporterName: null,
        transporterPhone: null,
        price: null,
        status: "Активно"
    })
    try {
        await order.save()
                res.status(201).json({
                    message: 'Замовлення успішно створено'
                })
    } catch (error) {
        errorHandler(res, error)
    }
}
module.exports.createOrderCity = async (req, res) =>{
    try {
        const cities = await Cities.find()
        res.status(200).json(cities)

    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.getHistory = async (req, res)=>{
    try {
        const orders = await Order.find({user: req.user.id,status: "Завершено"})
        res.status(200).json(orders)
    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.getActive = async (req, res)=>{
    try {
        const orders = await Order.find({user: req.user.id, status: ["Активно", "Виконується", "Підтвердження"]})
       
        res.status(200).json(orders)
    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.getTrans = async (req, res)=>{
    try {
        const order = await Order.find({user: req.user.id, _id: req.params.id})
        const id = order.transporter
        const transporter = await Transporter.findById({_id: id})
        
        res.status(200).json([order, transporter])
    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.deleteById = async (req, res)=>{
    try {
        await Order.remove({_id: req.params.id})
        res.status(200).json({
          message: 'Замовлення видалено'
        })
      } catch (e) {
        errorHandler(res, e)
      }
}
module.exports.accept = async (req, res)=>{
    try {
        const order = await Order.findOneAndUpdate(
            {user: req.user.id, orderNum: req.params.id},
            {$set: {status: "Виконується"}},
            {new: true}
        )
        res.status(200).json({
            message: 'Замовлення прийнято'
        })
    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.verify = async (req,res)=>{

    try {
        const candidate = await Client.findOneAndUpdate(
            {secretToken: req.query.token},
            {$set: {confirmed: true}},
            {new: true}
    )
        res.status(200).redirect("http://localhost:4200/client?registered=true")

    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.discard = async (req,res)=>{
    try {
        await Order.findOneAndUpdate(
            {user: req.user.id, _id: req.body._id},
            {$set: {status: "Активно", transporter: null, transporterName: null, transporterPhone: null}},
            {new: true}
        )
        res.status(200).json({
            message: "Відмовлено"
        })

    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.allow = async (req,res)=>{
    try {
        await Order.findOneAndUpdate(
            {user: req.user.id, _id: req.body._id},
            {$set: {status: "Виконується"}},
            {new: true}
        )
        res.status(200).json({
            message: "Замовлення виконується"
        })

    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.end = async (req,res)=>{
    try {
        await Order.findOneAndUpdate(
            {user: req.user.id, _id: req.body._id},
            {$set: {status: "Завершено"}},
            {new: true}
        )
        res.status(200).json({
            message: "Замовлення виконано"
        })

    } catch (e) {
        errorHandler(res, e)
    }
}


module.exports.getInProcess = async (req, res)=>{
    try {
        const orders = await Order.find({user: req.user.id, status: ["Виконується"]})

        res.status(200).json(orders)
    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.getApproved = async (req, res)=>{
    try {
        const orders = await Order.find({user: req.user.id, status: ["Підтвердження"]})

        res.status(200).json(orders)
    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.getActiveOrders = async (req, res)=>{
    try {
        const orders = await Order.find({user: req.user.id, status: ["Активно"]})

        res.status(200).json(orders)
    } catch (error) {
        errorHandler(res, error)
    }
}