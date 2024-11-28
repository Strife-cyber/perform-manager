import nodemailer from 'nodemailer';

class EmailService {
    constructor(user, password) {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465, // Secure SMTP port for Gmail
            secure: true, // Use SSL
            auth: {
                user: user,
                pass: password, // App password (generated for Gmail)
            },
            // comment this part if you do not have a disturbing antivirus
            tls: { 
                rejectUnauthorized: false, // Disable certificate validation (use only in trusted environments)
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
        }
    }
}

/*
// Example Usage
const USER = 'ADD A USER HERE <YOUR GMAIL ACCOUNT>';
const PASSWORD = 'ADD THE PASSWORD YOU GOT AFTER 2 FACTOR AUTH AND GEN APP KEY HERE';

// Create an instance of EmailService
const emailService = new EmailService(USER, PASSWORD);

// Use the sendEmail method
emailService.sendEmail(
    'recipient@example.com',
    'Testing Gmail Email Service',
    `<h1 style="color: blue">Hello from EmailService!</h1>
    <p>This is a test email sent using Gmail with <strong>nodemailer</strong>.</p>`
);
*/