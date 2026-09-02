const logger = require('../utils/logger');


const requestLogger = async(req,res,next) => {

    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;

        logger.info('http request', {
            method: req.method,
            path: req.originalUrl,
            statusCode: res.statusCode,
            duration: `${duration}ms`,
            ip: req.ip 
        });
    });

    next();
};

module.exports = requestLogger;

