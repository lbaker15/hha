const nodemailer = require("nodemailer");
var nodeoutlook = require('nodejs-nodemailer-outlook')

const sendEmail = async (email, subject, text) => {
    try {
        //let testAccount = await nodemailer.createTestAccount();
        const transporter = nodeoutlook.sendMail({
            service: 'hotmail',
            auth: {
                user: 'laelbaker@hotmail.co.uk',
                password: '4rtghlae'
            },
            from: 'laelbaker@hotmail.co.uk',
            to: email,
            subject: subject,
            text: text
            // auth: {
            //     user: 'laelbaker@gmail.com',
            //     pass: 'vphztuqtydedfvzw',
            // },
        });

        // await transporter.sendMail({
        //     from: 'laelbaker@hotmail.co.uk',
        //     to: email,
        //     subject: subject,
        //     text: text,
        // });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;