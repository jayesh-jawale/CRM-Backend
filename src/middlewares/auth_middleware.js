const { getToken, deleteToken } = require('../helpers/redis_helpers');

const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("x-auth-token");
        const verifyToken = jwt.verify(token, process.env.MY_SECRET_KEY_ACCESS);
      
        // We have passed "email" as parameter to create token, so we are using "email"
        if (verifyToken.email) {
          const userId = await getToken(token);
      
          // We can pass getTokenByID as property of req
          req.userId = userId;
         return next();
    }
        deleteToken(token);
}
    catch(error) {
        res.status(401).send({error: error.message});
    }
  }

module.exports = {
    authMiddleware,
};