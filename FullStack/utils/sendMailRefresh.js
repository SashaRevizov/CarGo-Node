const nodemailer = require("nodemailer");

const express = require('express')
const app = express()
async function mailRef(req,adress,token, rand){

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount()
    
    const link="http://"+req.get('host')+"/client/login/refreshClient?token="+token+"&pass="+rand

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
      subject: "Відновлення паролю", // Subject line
      text: "Якщо ви не відправляли запрос,  проігнуруйте це повідомлення", // plain text body
      html: "Привіт ,<br> Підтвердіть.<br><a href="+link+">Натисніть тут для зміни</a> <br><h3>Новий пароль: "+rand+"</h3>" // html body
    })
  

  }



module.exports = mailRef