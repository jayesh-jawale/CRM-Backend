const express = require("express");
const router = express.Router();

const {insertUser, userByEmail} = require("../model/user/userModel");
const {hashedPassword, comparePassword} = require("../helpers/bcrypt__Password");

router.all('/', (req, res, next) => {
    // res.send("Message from user Router");
    next();
})

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

// User login
// Get user by email from db
router.post('/login', async(req, res) => {
    const {email, password} = req.body

    if(!email || !password) {
       return res.json({message: 'Invalid from submission'})
    }

    const user = await userByEmail(email);  
    const storedPassword = user.password;

    // Compare actual password and entered password
    const result = await comparePassword(password, storedPassword)
    if(result) {
        res.json({message: 'Login Successfull'})
    } else {
        res.json({message: 'Invalid Credentials'})
    }
})

module.exports =  router;