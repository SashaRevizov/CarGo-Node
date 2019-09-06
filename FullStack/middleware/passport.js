JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/client')
const Trans = require('../models/transporter')
const Admin = require('../models/admin')
const keys = require('../config/keys')

const option = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt
}


module.exports = passport => {
    passport.use('client',
        new JwtStrategy(option, async (payload, done)=>{
            try {
                const user = await User.findById(payload.userId).select('email id')
                if (user) {

                    done(null, user)
                } else {
                    done(null, false)
                }
            } catch (error) {
                console.log(error)
            }
        })
    )
    passport.use('transporter',
        new JwtStrategy(option, async (payload, done)=>{
            try {
                const user = await Trans.findById(payload.userId).select('email id')
                if (user) {

                    done(null, user)
                } else {
                    done(null, false)
                }
            } catch (error) {
                console.log(error)
            }
        })
    )
    passport.use('admin',
    new JwtStrategy(option, async (payload, done)=>{
        try {
            const user = await Admin.findById(payload.userId).select('login id')
            if (user) {
                done(null, user)
            } else {
                done(null, false)
            }
        } catch (error) {
            console.log(error)
        }
    })
)
}