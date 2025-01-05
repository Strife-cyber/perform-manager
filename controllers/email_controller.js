import EmailService from '../services/email_service.js';

const sendMail = async (req, res) => {
    const { recipient, subject, html } = req.body;
    const username = "dunamisjunior15@gmail.com";
    const password = "vrwx pyyg banv fads";

    try {
        const emailService = new EmailService(username, password); // Assuming EmailService is a class
        await emailService.sendEmail(recipient, subject, html);
        res.status(201).json({ message: 'Email Sent' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending email' });
    }
};

export default sendMail;
