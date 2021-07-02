const nodemailer = require("nodemailer");
var nodeoutlook = require('nodejs-nodemailer-outlook')

const sendEmail = async (email, subject, text) => {
        return nodeoutlook.sendEmail({
            auth: {
                user: 'laelbaker@hotmail.co.uk',
                pass: '4rtghlae'
            },
            from: 'laelbaker@hotmail.co.uk',
            to: email,
            subject: subject,
            text: text,
            onError: (e) => console.log(e),
            onSuccess: (i) => console.log(i)
            
        });

        // await transporter.sendMail({
        //     from: 'laelbaker@hotmail.co.uk',
        //     to: email,
        //     subject: subject,
        //     text: text,
        // });

      
};

module.exports = sendEmail;