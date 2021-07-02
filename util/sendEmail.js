const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
        //let testAccount = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            // service: process.env.SERVICE,
            port: 465,
            secure: true,
            auth: {
                user: 'laelbaker@gmail.com',
                pass: '4rtghlae',
            },
        });

        await transporter.sendMail({
            from: 'laelbaker@gmail.com',
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