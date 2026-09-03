const express = require('express');
const router = express.Router();

const documentController = require('./document.controller.js');
const upload = require('../../config/upload');
const authenticate = require('../../middlewares/authenticate');
const authorize = require('../../middlewares/authorize');

router.post(
    '/upload',
    authenticate,
    authorize("uploader", "admin"),
    upload.single('document'),
    documentController.uploadDocument
);

module.exports = router;