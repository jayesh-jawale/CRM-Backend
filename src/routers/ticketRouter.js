const express = require("express");
const router = express.Router();

const {
    insertTicket,
     getTicket,
     getTicketById,
     updateTicketById,
     closeTicketById
    } = require("../model/ticket/ticketModel")
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
router.get('/:_id', authMiddleware, async (req, res) => {
    const {_id} = req.params;
    const userId = req.userId;

    const data = await getTicketById(_id, userId)

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

// Update ticket by Id
router.put('/:_id', authMiddleware, async (req, res) => {
    const {_id} = req.params;
    const {sender, message} = req.body;

    const data = await updateTicketById({_id, sender, message})

    if (data._id) {
        return res.json({
          status: "success",
          message: "ticket is updated",
        });
      }
  
      res.json({
        status: "error",
        message: "Cannot update tickts",
      });
})

// Close ticket
router.patch('/close_ticket/:_id', authMiddleware, async (req, res) => {
    const {_id} = req.params;
    const userId = req.userId;

    const data = await closeTicketById({_id, userId})

    if (data._id) {
        return res.json({
          status: "success",
          message: "ticket is closed",
        });
      }
  
      res.json({
        status: "error",
        message: "Cannot close ticket",
      });
})

module.exports =  router;