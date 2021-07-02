const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
        //let testAccount = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport('SMTP',{
            service: 'hotmail', // hostname
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