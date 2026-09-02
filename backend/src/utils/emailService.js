const transporter = require("../config/mail.js");
const path = require("path");
const fs = require("fs/promises");

const sendEmail = async ({ to, subject, text, html }) => {

    const mailOptions = {
        from: process.env.MAIL_FROM,
        to,
        subject,
        text,
        html
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        throw error;
    }
};

const sendEmailVerificationCode = async ({
    email, 
    verificationCode,
    firstName,
    verificationCodeExpiryMinutes
}) => {

    const templatePath = path.join(
        __dirname,
        "../templates/verify-email.html"
    );

    let html = await fs.readFile(templatePath, "utf-8");

    html = html
        .replace("{{firstName}}", firstName)
        .replace("{{verificationCode}}", verificationCode)
        .replace(
            "{{verificationCodeExpiryMinutes}}",
            verificationCodeExpiryMinutes
        );

    await sendEmail({
        to: email,
        subject: "Verify your email",
        text: `Your email verification code is: ${verificationCode}`,
        html
    });
};

module.exports = {
    sendEmail,
    sendEmailVerificationCode
};