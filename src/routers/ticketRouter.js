const express = require("express");
const router = express.Router();

const {insertTicket, getTicket, getTicketById} = require("../model/ticket/ticketModel")
const {authMiddleware} = require("../middlewares/auth_middleware")

router.all('/', (req, res, next) => {
    // res.send("Message from ticket Router");
    next();
})

// Create ticket
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

// Get all tickets
router.get('/', authMiddleware, async (req, res) => {
    const userId = req.userId;

    const data = await getTicket(userId)

    if (data) {
        return res.json({
          status: "success",
          data,
        });
      }
  
      res.json({
        status: "error",
        message: "Cannot get tickts",
      });
})

// Get ticket by Id
router.get('/:tId', authMiddleware, async (req, res) => {
    const {tId} = req.params;
    const userId = req.userId;

    const data = await getTicketById(tId, userId)

    if (data) {
        return res.json({
          status: "success",
          data,
        });
      }
  
      res.json({
        status: "error",
        message: "Cannot get tickts",
      });
})

module.exports =  router;