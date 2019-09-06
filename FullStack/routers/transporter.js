const express = require('express');
const passport = require('passport')
const router = express.Router();
const controller = require('../controllers/transporter');
const upload = require('../middleware/upload')




router.post('/login', controller.login);
router.post('/login/refresh', controller.refresh);
router.get('/login/refreshTransporter', controller.newPassUrl)
router.post('/register', upload.single('image'), controller.register);

router.get('/profile', passport.authenticate('transporter', {session: false}), controller.profileView);
router.patch('/profile', passport.authenticate('transporter', {session: false}), controller.profileUpdate);

router.get('/orders', passport.authenticate('transporter', {session: false}), controller.getOrder);
router.patch('/orders', passport.authenticate('transporter', {session: false}), controller.accept);
router.get('/active_orders', passport.authenticate('transporter', {session: false}), controller.getActive);
router.get('/history', passport.authenticate('transporter', {session: false}), controller.getHistory);
router.get('/in_process_orders', passport.authenticate('transporter', {session: false}), controller.getInProcess)

module.exports = router;