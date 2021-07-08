const nodemailer = require("nodemailer");
const sendGridTransport = require('nodemailer-sendgrid-transport');

const sendEmail = async (email, subject, text) => {
    const transporter = nodemailer.createTransport(sendGridTransport({
        auth: {
            api_key: process.env.SEND_GRID_KEY
        }
    }))
      
};

module.exports = sendEmail;