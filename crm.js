import express, { response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { createClients, getUserByEmail, genPassword } from "./helper.js";
const router = express.Router();

// Create Client
router.post('/add', express.json(), async(req, res) => {
    const data = req.body;
    console.log(data);
    const addedClient = await createClients(data);
  
    res.send(addedClient);
  })

  // Sign Up
  router.route('/signup').post( async (req, res) => {
    const {email, password} = req.body;
    // Check if username already exists
    const isUserExist = await getUserByEmail(email)
    if(isUserExist) {
      res.status(401).send({message: 'User already exists'})
      return;
    }
    // Check passsword strength, password pattern
    if(!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@!#%&]).{8,}$/g.test(password)) {
      res.status(401).send({message: 'Password did not match'})
      return;
    }

    const hashedPassword = await genPassword(password);
    const result = await createClients({
        email: email,
        password: hashedPassword,
    })
    res.send(result)
})

// Sign in
router.route('/signin').post( async (req, res) => {
    const {email, password} = req.body;
    const userFromDB = await getUserByEmail(email)
    if(!userFromDB) {
      res.status(401).send({message: 'Invalid Credentials'})
      return;
    }
    
    const storedPassword = userFromDB.password;
    const isPasswordMatch = await bcrypt.compare(password, storedPassword);
    if(isPasswordMatch) {
      // issue the token
      const token = jwt.sign({id : userFromDB._id}, process.env.SECRET_KEY);
      res.send({message: "Successfull login", token: token})
    }
    else {
      res.status(401).send({message: 'Invalid Credentials'})
      return;
    }
  })

  export const crmRouter = router;