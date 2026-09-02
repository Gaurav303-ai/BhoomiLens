const asyncHandler = require('../../utils/asyncHandler.js');
const authService = require('./auth.service.js');
console.log("controllers hit");

const signupSession = asyncHandler(async(req,res,next) => {

    // const {firstName,lastName,designation,employeeId,phoneNumber} = req.body;

    const data = await authService.signupSession(req.body);
    console.log("signup session controllers reached ")

    return res.status(200).json({
        success: true,
        message: "signup success, Email verificatin code has been sent",
        data
    });

});

const verifyEmail = asyncHandler(async(req,res,next) => {

    const {
        user:{
            signupId,
            email
        },
        verificationCode
    } = req.body;

    const data = await authService.verifyEmail({
        signupId,
        email,
        verificationCode
    });

    return res.status(200).json({
        success:true,
        message:"verification code verify successfully",
        data
    });

});

const setPassword = asyncHandler(async(req,res,next) => {
    const {
        user:{
            signupId,
            email
        },
        password
    } = req.body;
    
    const data = await authService.setPassword({
        signupId,
        email,
        password
    });

    return res.status(201).json({
        succes:true,
        message:"user resgistered successfully",
        data
    });

});

//login controller
const login = asyncHandler(async(req,res,next) => {
    console.log("login body:", req.body);
    const {employeeID,password} = req.body;
    
    if (!employeeID || !password) {
       throw new apiError(400, "Missing employeeID or password");
    }

    const data = await authService.login({
        employeeID,
        password
    });

    return res.status(200).json({
        success:true,
        message:"login successful",
        data
    });
});

const refreshAccessToken = asyncHandler(async(req,res,next) => {

    console.log(req.body);
    const data = await authService.refreshAccessToken(req.body.refreshToken);

    return res.status(200).json({
        success:true,
        message:"new Access Token generated Sucessfully",
        data
    });
});


module.exports = {
    signupSession,
    verifyEmail,
    setPassword,
    login,
    refreshAccessToken
}
