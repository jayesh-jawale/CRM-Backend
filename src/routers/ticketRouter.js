const express = require("express");
const router = express.Router();

const {insertTicket} = require("../model/ticket/ticketModel")
const {authMiddleware} = require("../middlewares/auth_middleware")

router.all('/', (req, res, next) => {
    // res.send("Message from ticket Router");
    next();
})

router.post('/', authMiddleware, async (req, res) => {
    const {subject, sender, message} = req.body;
    const userId = req.userId;

    const ticketData = {
        clientId: userId,
        subject,
        conversations: [
            {
                sender,
                message,
            }
        ]
    }

    const data = await insertTicket(ticketData)

    if (data._id) {
        return res.json({
          status: "success",
          message: "New ticket has been created!",
        });
      }
  
      res.json({
        status: "error",
        message: "Unable to create the ticket , please try again later",
      });
})

module.exports =  router;