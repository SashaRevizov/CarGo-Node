const express = require('express');
const router = express.Router();
const controller = require('../controllers/admin');
const passport = require('passport')


const app = express();



router.post('/login', controller.login)


router.get('/orders', passport.authenticate('admin', {session: false}), controller.getOrders)
router.delete('/orders/:id', passport.authenticate('admin', {session: false}), controller.delOrder)


router.get('/transporters',   passport.authenticate('admin', {session: false}), controller.getTransporters)
router.patch('/transporters', passport.authenticate('admin', {session: false}), controller.confirmTransporter)
router.delete('/transporter/:id', passport.authenticate('admin', {session: false}), controller.delTransporter)

router.get('/clients', passport.authenticate('admin', {session: false}), controller.getClients)
router.delete('/client/:id', passport.authenticate('admin', {session: false}), controller.delClient)





module.exports = router