const express = require('express');
const router = express.Router();

const authRoutes = require('../modules/auth/auth.routes');
const ocrRoutes = require('../modules/ocr/ocr.controller');
console.log(ocrRoutes);
router.use('/auth',authRoutes);
router.use('/ocr',ocrRoutes);
module.exports = router;