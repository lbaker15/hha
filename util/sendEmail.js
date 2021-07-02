const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
        let testAccount = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            // service: process.env.SERVICE,
            port: 587,
            secure: true,
            auth: {
                user: testAccount.user,
                pass: testAccount.password,
            },
        });

        await transporter.sendMail({
            from: testAccount.user,
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