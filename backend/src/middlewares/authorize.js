const ApiError = require('../utils/ApiError');

const authorize = (...requiredRoles) => {
    return (req,res,next) => {
        if (!req.user) {
            return next(new ApiError(401, "Authentication required"));
        }
        const userRole = req.user.role;
        console.log(userRole);
       

        if ( !requiredRoles.includes(userRole)){
            return next(new ApiError(403, "Acess Denied: You do not have permission to access this resource"));
        }

        next();
    };
};

module.exports = authorize;