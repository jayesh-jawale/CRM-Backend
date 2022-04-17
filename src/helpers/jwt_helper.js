const jwt = require('jsonwebtoken');
const {setToken, getToken} = require("./redis_helpers");
const {storeTokenInDB} = require('../model/user/userModel');

const createToken = async (email, _id) => {
    try {
      // Token is generated
      const accessJWT = await jwt.sign({ email }, process.env.MY_SECRET_KEY_ACCESS, {
        expiresIn: "1d",
      });
  
      // Set created token above in Redis database
      await setToken(accessJWT, _id);
      return Promise.resolve(accessJWT);
    } catch (error) {
      return Promise.reject(error);
    }
  };

const createRefreshToken = async (email, _id) => {
        const refreshToken = jwt.sign({ email }, process.env.MY_SECRET_KEY_REFRESH, {
            expiresIn: '30d'
        });
       await storeTokenInDB(_id, refreshToken)
       return Promise.resolve(refreshToken);
}

module.exports = {
    createToken,
    createRefreshToken,
}