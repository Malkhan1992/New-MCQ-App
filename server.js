const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const port = process.env.PORT || 8000;

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Serve static files from the root directory
app.use(express.static(__dirname));

// Serve images from the images directory
app.use('/images', express.static(path.join(__dirname, 'images')));

// Special route for database files
app.use('/database', express.static(path.join(__dirname, 'database')));

// Special route for medal images
app.use('/medals', express.static(path.join(__dirname, 'medals')));

// Create directory endpoint
app.post('/create-directory', async (req, res) => {
    try {
        const { path: dirPath } = req.body;
        if (!dirPath) {
            return res.status(400).json({ error: 'Path is required' });
        }

        const fullPath = path.join(__dirname, dirPath);
        await fs.mkdir(fullPath, { recursive: true });
        res.json({ message: `Directory ${dirPath} created successfully` });
    } catch (error) {
        console.error('Error creating directory:', error);
        res.status(500).json({ error: 'Failed to create directory' });
    }
});

// Save file endpoint
app.post('/save-file', async (req, res) => {
    try {
        const { path: filePath, content } = req.body;
        if (!filePath || content === undefined) {
            return res.status(400).json({ error: 'Path and content are required' });
        }

        const fullPath = path.join(__dirname, filePath);
        const dirPath = path.dirname(fullPath);
        
        // Ensure directory exists
        await fs.mkdir(dirPath, { recursive: true });
        
        // Write the file
        await fs.writeFile(fullPath, content);
        res.json({ message: `File ${filePath} saved successfully` });
    } catch (error) {
        console.error('Error saving file:', error);
        res.status(500).json({ error: 'Failed to save file' });
    }
});

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle 404 errors
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Images path: ${path.join(__dirname, 'images')}`);
    console.log(`Database path: ${path.join(__dirname, 'database')}`);
}); 