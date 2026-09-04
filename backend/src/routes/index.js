const express = require('express');
const router = express.Router();

const authRoutes = require('../modules/auth/auth.routes');
router.use('/auth',authRoutes);
const documentRoutes = require('../modules/documents/document.routes');
router.use('/document',documentRoutes);
module.exports = router;