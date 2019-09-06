const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const randomString= require('randomstring')

const mail = require('../utils/sendMailRefreshTr')

const errorHandler = require('../utils/errorHandler')
const Transporter = require('../models/transporter')
const keys = require('../config/keys')


const Order = require('../models/order')
module.exports.login = async (req, res)=>{
    const candidate = await Transporter.findOne({email: req.body.email})
    if (candidate){
        if (!candidate.confirmed){
            res.status(406).json({
                message: 'Перевірка документів очікуйте'
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

module.exports.register = async (req,res)=>{
    const candidate = await Transporter.findOne({email: req.body.email})
    if (candidate){
        res.status(409).json({
            message: 'Email вже використовується'
        })
    } else {

        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const rand = randomString.generate()

            const user = new Transporter({
                name: req.body.name,
                surname: req.body.surname,
                phone: req.body.phone,
                document: req.file ? req.file.path : '',
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
        const candidate = await Transporter.findOne({email: req.body.email})
        const randPass = randomString.generate(6)
        if (candidate.secretToken){
            mail(req,req.body.email,candidate.secretToken, randPass)
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
        const candidate = await Transporter.findOneAndUpdate(
            {secretToken: req.query.token},
            {$set: {password: bcrypt.hashSync(password, salt)}},
            {new: true}
    )
        res.status(200).redirect("http://localhost:4200/transporter?registered=true")

    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.profileView = async (req, res)=>{
    try {
        const user = await Transporter.findById({_id: req.user.id})
        res.status(200).json(user)
    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.profileUpdate = async (req, res)=>{
    const salt = bcrypt.genSaltSync(10)
    const password = req.body.password
    try {
        const user = await Transporter.findOneAndUpdate(
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

module.exports.getOrder = async (req, res)=>{
    try {
        const orders = await Order.find({status: ["Активно"]})
        res.status(200).json(orders)
    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.getActive = async (req, res)=>{
    try {
        const orders = await Order.find({transporter: req.user.id, status: ["Виконується", "Підтвердження"]})
        res.status(200).json(orders)
    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.getHistory = async (req, res)=>{
    try {
        const orders = await Order.find({transporter: req.user.id, status: ["Завершено"]})
        res.status(200).json(orders)
    } catch (error) {
        errorHandler(res, error)
    }
}


module.exports.accept = async (req, res)=>{
    try {
        const user = await Transporter.findById({_id: req.user.id})
        const order = await Order.findOneAndUpdate(
            {_id: req.body._id},
            {$set: {status: "Підтвердження",
                    transporter: req.user.id,
                    transporterName: user.surname + " " + user.name,
                    transporterPhone: user.phone,
                    price: req.body.price,
                }},
            {new: true}
        )
        res.status(200).json(order)
    } catch (error) {
        errorHandler(res, error)
    }
}


module.exports.getInProcess = async (req, res)=>{
    try {
        const orders = await Order.find({transporter: req.user.id, status: ["Підтвердження"]})
        res.status(200).json(orders)
    } catch (error) {
        errorHandler(res, error)
    }
}