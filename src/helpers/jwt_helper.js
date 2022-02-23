var jwt = require('jsonwebtoken');

const createToken = (payload) => {
    return new Promise((resolve) => {
        const accessToken = jwt.sign({ payload }, process.env.MY_SECRET_KEY, {
            expiresIn: '15m'
        });
        resolve(accessToken)
    })
}

const createRefreshToken = (payload) => {
    return new Promise((resolve) => {
        const refreshToken = jwt.sign({ payload }, process.env.MY_SECRET_KEY, {
            expiresIn: '30d'
        });
        resolve(refreshToken)
    })
}

module.exports = {
    createToken,
    createRefreshToken,
}