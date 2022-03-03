const express = require("express");
const jwt = require('jsonwebtoken');
const {userByEmail} = require('../model/user/userModel')
const {createToken} = require('../helpers/jwt_helper')
const {deleteToken} = require('../helpers/redis_helpers');

const router = express.Router();

router.all('/', async (req, res) => {
    try {
        const token = req.header("x-auth-token");

        // 1. Make sure token is valid
        const verifyToken = await jwt.verify(token, process.env.MY_SECRET_KEY_REFRESH);

        if(verifyToken.email) {
            const userEmail = await userByEmail(verifyToken.email);
            if(userEmail._id) {
                let tokenExpire = userEmail.refreshToken.addedAt;

                tokenExpire = tokenExpire.setDate(tokenExpire.getDate() + +process.env.REFRESH_JWT_EXPIRY_DATE)
                // Anything coming from env file comes as "string" so use + to convert to "number"
                console.log(new Date(tokenExpire));

                const todaysDate = new Date();

                if(tokenExpire < todaysDate) {
                    res.status(401).send({ message: "Forbidden" })
                }
                
                const accessJWT = await createToken(verifyToken.email, userEmail._id.toString());
                return res.json({ message: "success", accessJWT})
            }
        }
    }
    catch(error) {
        res.status(401).send({error: error.message})
    }
})

module.exports =  router;