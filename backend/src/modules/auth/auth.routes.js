const express = require("express");
const router = express.Router();
const authController = require('./auth.controller.js');

router.post(
    '/signup_session',
   authController.signupSession,   
);

router.post(
    '/verify_email',
    authController.verifyEmail
);

router.post(
    '/set_password',
    authController.setPassword
);

router.post(
    '/login',
    authController.login

);

router.post(
    "/refresh",
    authController.refreshAccessToken
);

module.exports = router;