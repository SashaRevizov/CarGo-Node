const express = require('express');
const router = express.Router();
const controller = require('../controllers/client');
const passport = require('passport')


const app = express();



router.get('/verify', controller.verify)
router.post('/login', controller.login)
router.post('/login/refresh', controller.refresh)
router.get('/login/refreshClient', controller.newPassUrl)
router.post('/register', controller.register)


router.get('/profile', passport.authenticate('client', {session: false}), controller.profileView)
router.patch('/profile', passport.authenticate('client', {session: false}), controller.profileUpdate)

router.post('/order', passport.authenticate('client', {session: false}), controller.createOrder)
router.get('/order', passport.authenticate('client', {session: false}), controller.createOrderCity)
router.delete('/order/:id', passport.authenticate('client', {session: false}), controller.deleteById)
router.patch('/order', passport.authenticate('client', {session: false}), controller.discard)
router.get('/active_orders', passport.authenticate('client', {session: false}), controller.getActive)
router.patch('/active_orders', passport.authenticate('client', {session: false}), controller.allow)
router.patch('/active_ordersEnd', passport.authenticate('client', {session: false}), controller.end)
router.get('/history', passport.authenticate('client', {session: false}), controller.getHistory)

router.get('/approved_orders', passport.authenticate('client', {session: false}), controller.getApproved)
router.get('/in_process_orders', passport.authenticate('client', {session: false}), controller.getInProcess)
router.get('/get_active_orders', passport.authenticate('client', {session: false}), controller.getActiveOrders)


module.exports = router