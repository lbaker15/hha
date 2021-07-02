const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
        //let testAccount = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com", // hostname
            secureConnection: false, // TLS requires secureConnection to be false
            port: 587, // port for secure SMTP
            tls: {
               ciphers:'SSLv3'
            },
            auth: {
                user: 'laelbaker@hotmail.co.uk',
                password: '4rtghlae'
            }
            // auth: {
            //     user: 'laelbaker@gmail.com',
            //     pass: 'vphztuqtydedfvzw',
            // },
        });

        await transporter.sendMail({
            from: 'laelbaker@hotmail.co.uk',
            to: email,
            subject: subject,
            text: text,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;