const nodemailer = require("nodemailer");

const express = require('express')
const app = express()
async function mail(req,adress,token){

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount()
    
    const link="http://"+req.get('host')+"/client/verify?token="+token

    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
        service: "Gmail",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "sasha160120@gmail.com", // generated ethereal user
          pass: "4ass55rf" // generated ethereal password
        }
      })
     
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'CarGo', // sender address
      to: adress, // list of receivers
      subject: "Please confirm your Email account", // Subject line
      text: "Підтвердження пошти", // plain text body
      html: "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>" // html body
    })
  

  }



module.exports = mail