const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')



const clientRouter = require('./routers/client')
const transporterRouter = require('./routers/transporter')
const keys = require('./config/keys')
const adminRouter = require('./routers/admin')
const app = express()


const con = mongoose.connect(keys.mongoURL,{ useNewUrlParser: true } )
    .then(() => console.log('Connected to DB'))
    .catch(error => console.log(error))
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)



app.use('/uploads', express.static('uploads'))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(passport.initialize())
require('./middleware/passport')(passport)

    


app.use('/client', clientRouter);
app.use('/transporter', transporterRouter);
app.use('/admin', adminRouter);

module.exports = app;