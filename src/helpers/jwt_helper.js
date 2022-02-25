const jwt = require('jsonwebtoken');
const {setToken, getToken} = require("./redis_helpers");

const createToken = async (email, _id) => {
    try {
      const accessJWT = await jwt.sign({ email }, process.env.MY_SECRET_KEY, {
        expiresIn: "15m",
      });
  
      await setToken(accessJWT, _id);
      return Promise.resolve(accessJWT);
    } catch (error) {
      return Promise.reject(error);
    }
  };

const createRefreshToken = (payload) => {
        const refreshToken = jwt.sign({ payload }, process.env.MY_SECRET_KEY, {
            expiresIn: '30d'
        });
       return Promise.resolve(refreshToken)
}

module.exports = {
    createToken,
    createRefreshToken,
}