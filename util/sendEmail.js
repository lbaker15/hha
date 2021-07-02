const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
        //let testAccount = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
            host: "localhost", // hostname
            secure: false, 
            port: 25, 
            auth: {
                user: 'lbaker@bws.digital',
                password: '4rtghlae'
            }
            // auth: {
            //     user: 'laelbaker@gmail.com',
            //     pass: 'vphztuqtydedfvzw',
            // },
        });

        await transporter.sendMail({
            from: 'lbaker@bws.digital',
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