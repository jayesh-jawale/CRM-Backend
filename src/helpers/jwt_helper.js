const jwt = require('jsonwebtoken');
const {setToken, getToken} = require("./redis_helpers");
const {storeTokenInDB} = require('../model/user/userModel');

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

const createRefreshToken = async (email, _id) => {
        const refreshToken = jwt.sign({ email }, process.env.MY_SECRET_KEY, {
            expiresIn: '30d'
        });
       await storeTokenInDB(_id, refreshToken)
       return Promise.resolve(refreshToken);
}

module.exports = {
    createToken,
    createRefreshToken,
}