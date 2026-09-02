const { verifyAccessToken } = require('../utils/jwt');
const apiError = require('../utils/apiError');
const authenticate = (req,res,next) =>{
    try{
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return next(new apiError(401, "Authorization token missing"));
        }

        const token = authHeader.split(' ')[1];
    
        const payLoad = verifyAccessToken(token);
        
        req.user=payLoad;
        next();
        
    } catch(error) {
        return next(
            new apiError(401,"Invalid or Expired Token")
        ); 
    }

};

module.exports = authenticate;