const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Create directory endpoint
app.post('/create-directory', async (req, res) => {
    try {
        const { path: dirPath } = req.body;
        if (!dirPath) {
            return res.status(400).json({ error: 'Path is required' });
        }

        // Normalize the path to prevent directory traversal
        const normalizedPath = path.normalize(dirPath);
        if (normalizedPath.startsWith('..')) {
            return res.status(400).json({ error: 'Invalid path' });
        }

        await fs.mkdir(normalizedPath, { recursive: true });
        res.json({ success: true, message: 'Directory created successfully' });
    } catch (error) {
        console.error('Error creating directory:', error);
        res.status(500).json({ error: `Failed to create directory: ${error.message}` });
    }
});

// Save file endpoint
app.post('/save-file', async (req, res) => {
    try {
        const { path: filePath, content } = req.body;
        if (!filePath || !content) {
            return res.status(400).json({ error: 'Path and content are required' });
        }

        // Normalize the path to prevent directory traversal
        const normalizedPath = path.normalize(filePath);
        if (normalizedPath.startsWith('..')) {
            return res.status(400).json({ error: 'Invalid path' });
        }

        // Ensure directory exists
        const dir = path.dirname(normalizedPath);
        await fs.mkdir(dir, { recursive: true });

        // Write file
        await fs.writeFile(normalizedPath, JSON.stringify(content, null, 2));
        res.json({ success: true, message: 'File saved successfully' });
    } catch (error) {
        console.error('Error saving file:', error);
        res.status(500).json({ error: `Failed to save file: ${error.message}` });
    }
});

// Get questions endpoint
app.get('/database/:user/:subject.json', async (req, res) => {
    try {
        const { user, subject } = req.params;
        const filePath = path.join('database', user, `${subject}.json`);
        
        const data = await fs.readFile(filePath, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        if (error.code === 'ENOENT') {
            res.status(404).json({ error: 'Questions not found' });
        } else {
            console.error('Error reading questions:', error);
            res.status(500).json({ error: `Failed to read questions: ${error.message}` });
        }
    }
});

// Update question pool endpoint
app.put('/database/admin/question_pool.json', async (req, res) => {
    try {
        const content = req.body;
        if (!content) {
            return res.status(400).json({ error: 'Content is required' });
        }

        // Ensure admin directory exists
        await fs.mkdir('database/admin', { recursive: true });

        // Write question pool file
        await fs.writeFile('database/admin/question_pool.json', JSON.stringify(content, null, 2));
        res.json({ success: true, message: 'Question pool updated successfully' });
    } catch (error) {
        console.error('Error updating question pool:', error);
        res.status(500).json({ error: `Failed to update question pool: ${error.message}` });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}); 