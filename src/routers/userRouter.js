const express = require("express");
const router = express.Router();

const {insertUser} = require("../model/user/userModel");
const {hashedPassword} = require("../helpers/bcrypt__Password");

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

module.exports =  router;