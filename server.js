import fs from 'fs';
import cors from 'cors';
import path from 'path';
import express from 'express';
import readline from 'readline';
import routes from './routes.js';
import bodyParser from 'body-parser';
import upload from './services/storage_service.js';


const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Use the built-in body parsers
app.use(bodyParser.json())
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Add API routes
app.use('/api', routes);


// More Routes
app.post('/upload', upload.single('file'), (req, res) => {
    if(!req.file) {
        return res.status(400).send('No file uploaded');
    }
    const filepath = path.join('uploads', req.file.filename);
    res.status(200).json({ message: 'File uploaded successfully', path: filepath });
})

app.get('/download', (req, res) => {
    const filepath = req.query.filepath;

    if (!filepath || !fs.existsSync(filepath)){
        return res.status(404).send('File not found');
    }
    res.download(filepath, (err) => {
        if (err) console.error('Error sending file:', err)
    })
})

// Function to listen for 'q' to quit
function listenForQuitCommand() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on('line', (input) => {
        if (input.trim().toLowerCase() === 'q') {
            console.log("Shutting down server...");
            process.exit(0); // Gracefully exit the server
        } else if (input.trim().toLowerCase() === 'c') {
            console.clear(); // Clear the console
        }
    });
}

// Start the server
app.listen(PORT, () => {
    console.clear();
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log("Press 'q' to quit the server.");
    listenForQuitCommand(); // Start listening for quit command after server starts
});
