const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 8000;

// Enable CORS for all routes
app.use(cors());

// Serve static files from the root directory
app.use(express.static(__dirname));

// Serve images from the images directory
app.use('/images', express.static(path.join(__dirname, 'images')));

// Special route for database files
app.use('/database', express.static(path.join(__dirname, 'database')));

// Special route for medal images
app.use('/medals', express.static(path.join(__dirname, 'medals')));

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    console.log(`Images path: ${path.join(__dirname, 'images')}`);
    console.log(`Database path: ${path.join(__dirname, 'database')}`);
}); 