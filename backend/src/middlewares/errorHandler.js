const logger = require('../utils/logger');
const errorHandler = (err,req,res,next) => {
    
    logger.error("Request failed", {
        method: req.method,
        path: req.originalUrl,
        statusCode: err.statusCode || 500,
        errorCode: err.code,
        message: err.message,
        stack: err.stack
    });

    if (err.code === "23505") {
        return res.status(409).json({
            success: false,
            message: "Resource already exists"
        });
    }


    const statusCode = err.statusCode || 500;
    const message = err.isOperational 
    ? err.message 
    : "Internal Server Error";

    res.status(statusCode).json({
        success:false,
        message
    });

}

module.exports = errorHandler;