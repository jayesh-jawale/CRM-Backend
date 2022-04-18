const express = require("express");
const router = express.Router();

const {insertUser, userByEmail, getUserById, updatedPassword, storeTokenInDB} = require("../model/user/userModel");
const {hashedPassword, comparePassword} = require("../helpers/bcrypt__helper");
const {createToken, createRefreshToken} = require("../helpers/jwt_helper");
const {authMiddleware} = require("../middlewares/auth_middleware");
const {setPasswordResetPin, getPinByEmail, deletePin} = require('../model/resetPin/resetPinModel');
const { sendEmail } = require("../helpers/email_helpers");
const { resetPasswordValidation, udatePasswordValidation } = require("../middlewares/formValidation_middlewware");
const{deleteToken} = require("../helpers/redis_helpers");

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
        res.json({status: "success", message: "user created", result})
        }
    catch(error) {
        let message = 'Unable to create user'
        if(error.message.includes('duplicate key error collection')) {
            message = 'this email already has account'
        }
        res.json({status: "error", message})
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

        res.json({status: "success",message: 'Login Successfull', accessJWT, refreshJWT})
    } else {
        res.json({status: "error", message: 'Invalid Credentials'})
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
router.post("/reset-password", resetPasswordValidation, async (req, res) => {
    const {email} = req.body;
    const user = await userByEmail(email)

    if(user && user._id) {
    // create unique 6 digit pin
    const setPin = await setPasswordResetPin(email);

    await sendEmail({email, pin: setPin.pin, type: "request-new-password"})

        return res.json({
            status: "success",
            message:
              "If the email is exist in our database, the password reset pin will be sent shortly.",
          });
    }

    res.json({
        status: "error",
        message:
        "If the email is exist in our database, the password reset pin will be sent shortly.",
      });
})

router.patch("/reset-password", udatePasswordValidation, async (req, res) => {
    const {email, pin, newPassword} = req.body;
    const getPin = await getPinByEmail(email, pin)
    console.log(getPin)

    if(getPin._id) {
        const dbdDate = getPin.addedAt;
        const days = 1;

        let expireDate = dbdDate.setDate(dbdDate.getDate() + days)
        const todaysDate = Date.now();
        if(todaysDate > expireDate) {
            return res.json({status: "error", message: "Pin is expired" })
        }

        const hashPassword = await hashedPassword(newPassword);
        const result = await updatedPassword(email, hashPassword);

        if(result._id) {
            // Send email notification (password has been updated)
            await sendEmail({email, type: "update-new-password"})
            await deletePin(email, pin);

            return res.json({status: "success", message: "Password is updated" })
        }
    }
    res.json({status: "error", message: "Unable to update password"})
})

router.delete("/logout", authMiddleware, async (req, res) => {
    const token = req.header("x-auth-token");
    const _id = req.userId;

    // Delete token from Redis DB
    deleteToken(token);

    //delete token from Mongo DB
    const result = await storeTokenInDB(_id, "")

    if(result._id) {
       return res.json({ status : "success", message: "Logged out successfully"})
    }

        res.json({ status : "error", message: "Unable to Logout"})
})

module.exports =  router;