// backend/routes/documentRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');

// POST Route for document upload
router.post('/upload', upload.single('document'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Please upload a document.' });
        }

        // Future update: Yahan se hum Python FastAPI ko file bhejenge AI processing ke liye
        
        res.status(200).json({
            success: true,
            message: 'Document uploaded successfully!',
            file: {
                filename: req.file.filename,
                path: req.file.path,
                size: req.file.size
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error during upload.', error: error.message });
    }
});

module.exports = router;