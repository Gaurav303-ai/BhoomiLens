const express = require('express');
const router = express.Router();

const authRoutes = require('../modules/auth/auth.routes');
const ocrRoutes = require('../modules/ocr/ocr.controller');
router.use('/auth',authRoutes);
const documentRoutes = require('../modules/documents/document.routes');
router.use('/document',documentRoutes);
router.use('/ocr',ocrRoutes);
module.exports = router;
