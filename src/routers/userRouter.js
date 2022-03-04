const express = require("express");
const router = express.Router();

const {insertUser, userByEmail, getUserById} = require("../model/user/userModel");
const {hashedPassword, comparePassword} = require("../helpers/bcrypt__helper");
const {createToken, createRefreshToken} = require("../helpers/jwt_helper");
const {authMiddleware} = require("../middlewares/auth_middleware");
const {setPasswordResetPin} = require('../model/resetPin/resetPinModel');

router.all('/', (req, res, next) => {
    // res.send("Message from user Router");
    next();
})

// Add User
router.post('/', async (req, res) => {
    const { name, company, address, phone, email, password } = req.body;
    try {
        const hashPassword = await hashedPassword(password)
        const bodyData = {
            name,
            company,
            address,
            phone,
            email,
            password : hashPassword
        }

        const result = await insertUser(bodyData);
        res.json({message: "user created", result})
        }
    catch(error) {
        res.json({status: "error", message: error.message})
    }
})

// User Login
// Get user by email from db
router.post("/login", async(req, res) => {
    const {email, password} = req.body

    if(!email || !password) {
       return res.json({message: 'Invalid from submission'})
    }

    const user = await userByEmail(email);  
    const storedPassword = user.password;

    // Compare actual password and entered password
    const result = await comparePassword(password, storedPassword)
    if(result) {
        // Create toen and store in Redis
        const accessJWT = await createToken(user.email, `${user._id}`);

        // Create token and store in MongoDB
        const refreshJWT = await createRefreshToken(user.email, `${user._id}`)

        res.json({message: 'Login Successfull', accessJWT, refreshJWT})
    } else {
        res.json({message: 'Invalid Credentials'})
    }
})

// Get User
router.get("/", authMiddleware, async (req, res) => {
    //this data coming form database
    const _id = req.userId;
  
    const userProf = await getUserById(_id);
    //3. extract user id(which is "value" in redis db)
    //4. get user profile based on the user id
  
    res.json({ user: userProf });
  });

// Create and send password reset pin number
router.post("/reset-password", async (req, res) => {
    const {email} = req.body;
    const user = await userByEmail(email)

    if(user && user._id) {
    // create unique 6 digit pin
    const setPin = await setPasswordResetPin(email);

    return res.send(setPin)
    }

    res.json({
        status: "error",
        message:
          "If the email is exist in our database, the password reset pin will be sent shortly.",
      });
})

module.exports =  router;