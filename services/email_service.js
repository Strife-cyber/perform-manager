import nodemailer from 'nodemailer';

export default class EmailService {
    constructor(user, password) {
        if (!user || !password) {
            throw new Error("SMTP credentials are missing. Please provide 'user' and 'password'.");
        }

        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465, // Secure SMTP port for Gmail
            secure: true, // Use SSL
            auth: {
                user, // Gmail account
                pass: password, // App password (not regular password)
            },
            tls: {
                rejectUnauthorized: false, // Optional: use for trusted environments only
            },
        });
    }

    async sendEmail(to, subject, html) {
        try {
            const info = await this.transporter.sendMail({
                from: this.transporter.options.auth.user, // Sender's email address
                to, // Recipient's email address
                subject, // Subject of the email
                html, // HTML content
            });
            console.log('Email sent successfully:', info.response);
        } catch (error) {
            console.error('Error sending email:', error);
            throw error; // Re-throw error for higher-level handling
        }
    }
}

/*
// Example Usage
const USER = 'your-gmail-account@gmail.com'; // Replace with your Gmail account
const PASSWORD = 'your-app-password'; // Replace with your Gmail App Password

// Create an instance of EmailService
const emailService = new EmailService(USER, PASSWORD);

// Use the sendEmail method
emailService.sendEmail(
    'recipient@example.com',
    'Testing Gmail Email Service',
    `<h1 style="color: blue">Hello from EmailService!</h1>
    <p>This is a test email sent using Gmail with <strong>nodemailer</strong>.</p>`
).catch(console.error);
*/
