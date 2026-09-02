const crypto = require('crypto');

const hashToken = (token) => {

    const hash = crypto.createHash('sha256') ;
    hash.update(token);
    const hashedToken = hash.digest('hex');

    return hashedToken ;
};

const generateCryptoToken = () => {
    return crypto.randomBytes(32).toString('hex');
}
const generateCryptoCode = () => {
    return crypto.randomInt(100000, 1000000).toString();
}


module.exports = {
    hashToken,
    generateCryptoToken,
    generateCryptoCode
};
