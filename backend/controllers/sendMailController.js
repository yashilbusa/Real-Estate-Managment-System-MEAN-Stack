import nodemailer from 'nodemailer';

const sendMail = async (to, subject, html) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.email,
                pass: process.env.password,
            }
        });

        const info = await transporter.sendMail({
            from: process.env.email,
            to,
            subject,
            html
        });
        return info;
    } catch (err) {
        console.info("Email sending error:", err);
        res.status(500).json({ err: "Failed to send email" });
    }
};

export default sendMail;
