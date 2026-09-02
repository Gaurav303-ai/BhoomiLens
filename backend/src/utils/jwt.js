const jwt = require('jsonwebtoken');
const secret_key_AccessToken = process.env.JWT_SECRET;
const secret_key_RefreshToken = process.env.JWT_REFRESH_SECRET;

const verifyAccessToken = (token) => {

  const payload = jwt.verify(token,secret_key_AccessToken);
  return payload;
}

const generateAccessToken = (payload) => {
    const token = jwt.sign(payload, secret_key_AccessToken, { expiresIn: process.env.JWT_EXPIRES_IN });
    return token;
}

const generateRefreshToken = (user_id) => {
    const token = jwt.sign({user_id},secret_key_RefreshToken,{expiresIn:process.env.JWT_REFRESH_EXPIRES_IN});
    return token;
};

const verifyRefreshToken = (token) => {
    const payload = jwt.verify(token,secret_key_RefreshToken);
    return payload;
};

module.exports = {
    verifyAccessToken,
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken

}