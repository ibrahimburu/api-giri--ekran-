const nodemailer = require("nodemailer");
const hash = require('../hash/hash');

const sendmail = async(email,id) => {
    let hashToId = hash(id);
    try {
        let transporter =nodemailer.createTransport({
            host: "smtp.mail.ru",
            port: 465,
            secure: true, 
        auth: {
            user: process.env.user,
            pass: process.env.pass, 
        }
    })
    await transporter.sendMail({
        from: '"buruSoftware 👻" <buru2425@mail.ru>', // sender address
        to: email, // list of receivers
        subject: "mail doğrulama", // Subject line
        html:`<p>mailinizi doğrulmak için <a href ="http://localhost:4000/verify/${hashToId}/${id}" style = "color:red">buraya </a>tıklayın</p>`
      });
    } catch (err) {
        console.log(err);
    }
}
module.exports = sendmail;