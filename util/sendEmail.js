const nodemailer = require("nodemailer");
const sendGridTransport = require('nodemailer-sendgrid-transport');

const sendEmail = async (email, subject, text) => {
    const transporter = nodemailer.createTransport(sendGridTransport({
        auth: {
            api_key: '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'
        }
    }))
      
};

module.exports = sendEmail;